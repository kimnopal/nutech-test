import { query, getClient, PreparedQuery } from "../config/database";
import { Transaction, HistoryRecord } from "../types/transaction.types";
import { Service } from "../types/information.types";

interface UserBalance {
  id: number;
  balance: number;
}

export async function getUserBalance(email: string): Promise<number> {
  const preparedQuery: PreparedQuery = {
    text: `
      SELECT balance
      FROM users
      WHERE email = $1
    `,
    values: [email],
  };

  const result = await query<{ balance: number }>(preparedQuery);
  return result.rows[0]?.balance ?? 0;
}

export async function getUserIdByEmail(email: string): Promise<number | null> {
  const preparedQuery: PreparedQuery = {
    text: `
      SELECT id
      FROM users
      WHERE email = $1
    `,
    values: [email],
  };

  const result = await query<{ id: number }>(preparedQuery);
  return result.rows[0]?.id ?? null;
}

export async function getServiceByCode(
  serviceCode: string
): Promise<Service | null> {
  const preparedQuery: PreparedQuery = {
    text: `
      SELECT id, service_code, service_name, service_icon, service_tariff, created_at
      FROM services
      WHERE service_code = $1
    `,
    values: [serviceCode],
  };

  const result = await query<Service>(preparedQuery);
  return result.rows[0] || null;
}

export async function updateBalanceAndCreateTransaction(
  email: string,
  amount: number,
  transactionType: "TOPUP" | "PAYMENT",
  invoiceNumber: string,
  description: string,
  serviceCode: string | null = null
): Promise<{ balance: number; transaction: Transaction }> {
  const client = await getClient();

  try {
    await client.query("BEGIN");

    const userResult = await client.query<UserBalance>(
      `SELECT id, balance FROM users WHERE email = $1 FOR UPDATE`,
      [email]
    );

    if (userResult.rows.length === 0) {
      throw new Error("User not found");
    }

    const userId = userResult.rows[0].id;
    const currentBalance = userResult.rows[0].balance;

    const balanceChange = transactionType === "TOPUP" ? amount : -amount;
    const newBalance = currentBalance + balanceChange;

    if (transactionType === "PAYMENT" && newBalance < 0) {
      throw new Error("Insufficient balance");
    }

    await client.query(
      `UPDATE users SET balance = $1, updated_at = NOW() WHERE email = $2`,
      [newBalance, email]
    );

    const transactionResult = await client.query<Transaction>(
      `INSERT INTO transactions (user_id, invoice_number, transaction_type, service_code, description, total_amount)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, user_id, invoice_number, transaction_type, service_code, description, total_amount, created_on`,
      [userId, invoiceNumber, transactionType, serviceCode, description, amount]
    );

    await client.query("COMMIT");

    return {
      balance: newBalance,
      transaction: transactionResult.rows[0],
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function getTransactionHistory(
  email: string,
  offset: number = 0,
  limit: number | null = null
): Promise<HistoryRecord[]> {
  let queryText = `
    SELECT 
      t.invoice_number,
      t.transaction_type,
      t.description,
      t.total_amount,
      t.created_on
    FROM transactions t
    INNER JOIN users u ON u.id = t.user_id
    WHERE u.email = $1
    ORDER BY t.created_on DESC
    OFFSET $2
  `;

  const values: (string | number)[] = [email, offset];

  if (limit !== null && limit > 0) {
    queryText += ` LIMIT $3`;
    values.push(limit);
  }

  const preparedQuery: PreparedQuery = {
    text: queryText,
    values,
  };

  const result = await query<{
    invoice_number: string;
    transaction_type: "TOPUP" | "PAYMENT";
    description: string;
    total_amount: number;
    created_on: Date;
  }>(preparedQuery);

  return result.rows.map((row) => ({
    invoice_number: row.invoice_number,
    transaction_type: row.transaction_type,
    description: row.description,
    total_amount: row.total_amount,
    created_on: row.created_on.toISOString(),
  }));
}

export async function generateInvoiceNumber(): Promise<string> {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");

  const preparedQuery: PreparedQuery = {
    text: `
      SELECT COUNT(*) as count
      FROM transactions
      WHERE DATE(created_on) = CURRENT_DATE
    `,
  };

  const result = await query<{ count: string }>(preparedQuery);
  const sequence = parseInt(result.rows[0].count, 10) + 1;
  const paddedSequence = sequence.toString().padStart(3, "0");

  return `INV${dateStr}-${paddedSequence}`;
}
