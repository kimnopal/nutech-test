export interface Transaction {
  id: number;
  user_id: number;
  invoice_number: string;
  transaction_type: 'TOPUP' | 'PAYMENT';
  service_code: string | null;
  description: string;
  total_amount: number;
  created_on: Date;
}

export interface BalanceResponse {
  balance: number;
}

export interface TopUpRequest {
  top_up_amount: number;
}

export interface TopUpResponse {
  balance: number;
}

export interface TransactionRequest {
  service_code: string;
}

export interface TransactionResponse {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: 'PAYMENT';
  total_amount: number;
  created_on: string;
}

export interface HistoryRecord {
  invoice_number: string;
  transaction_type: 'TOPUP' | 'PAYMENT';
  description: string;
  total_amount: number;
  created_on: string;
}

export interface HistoryResponse {
  offset: number;
  limit: number;
  records: HistoryRecord[];
}
