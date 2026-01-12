import { Router } from "express";
import * as transactionController from "../controllers/transaction.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  topUpSchema,
  transactionSchema,
} from "../validators/transaction.validator";

const router = Router();

router.get("/balance", authenticate, transactionController.getBalance);
router.post(
  "/topup",
  authenticate,
  validate(topUpSchema),
  transactionController.topUp
);
router.post(
  "/transaction",
  authenticate,
  validate(transactionSchema),
  transactionController.createTransaction
);
router.get(
  "/transaction/history",
  authenticate,
  transactionController.getHistory
);

export default router;
