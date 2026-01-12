import { Router } from "express";
import * as transactionController from "../controllers/transaction.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  topUpSchema,
  transactionSchema,
} from "../validators/transaction.validator";

const router = Router();

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Get balance
 *     description: Digunakan untuk mendapatkan informasi balance/saldo User
 *     tags: [3. Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan balance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BalanceResponse'
 *       401:
 *         description: Unauthorized - Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 */
router.get("/balance", authenticate, transactionController.getBalance);

/**
 * @swagger
 * /topup:
 *   post:
 *     summary: Top up balance
 *     description: Digunakan untuk melakukan top up balance/saldo User
 *     tags: [3. Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TopUpRequest'
 *     responses:
 *       200:
 *         description: Top up berhasil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BalanceResponse'
 *       400:
 *         description: Bad Request - Validasi gagal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 */
router.post(
  "/topup",
  authenticate,
  validate(topUpSchema),
  transactionController.topUp
);

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create transaction
 *     description: Digunakan untuk melakukan transaksi pembayaran dari services/layanan yang tersedia
 *     tags: [3. Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionRequest'
 *     responses:
 *       200:
 *         description: Transaksi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Transaksi berhasil
 *                 data:
 *                   $ref: '#/components/schemas/TransactionResponse'
 *       400:
 *         description: Bad Request - Service tidak ditemukan atau saldo tidak cukup
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 */
router.post(
  "/transaction",
  authenticate,
  validate(transactionSchema),
  transactionController.createTransaction
);

/**
 * @swagger
 * /transaction/history:
 *   get:
 *     summary: Get transaction history
 *     description: Digunakan untuk mendapatkan informasi history transaksi
 *     tags: [3. Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Offset untuk pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit data yang ditampilkan (optional, default semua data)
 *     responses:
 *       200:
 *         description: Sukses mendapatkan history
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistoryResponse'
 *       401:
 *         description: Unauthorized - Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 */
router.get(
  "/transaction/history",
  authenticate,
  transactionController.getHistory
);

export default router;
