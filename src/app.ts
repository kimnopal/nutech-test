import express from "express";
import path from "path";
import dotenv from "dotenv";
import membershipRoutes from "./routes/membership.routes";
import informationRoutes from "./routes/information.routes";
import transactionRoutes from "./routes/transaction.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import { testConnection } from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = process.env.UPLOAD_DIR || "public/uploads";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  `/${UPLOAD_DIR}`,
  express.static(path.join(__dirname, "..", UPLOAD_DIR))
);

app.use("/", membershipRoutes);
app.use("/", informationRoutes);
app.use("/", transactionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  try {
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error("Failed to connect to database. Exiting...");
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`\nServer running on http://localhost:${PORT}`);
      console.log(`Uploads served from /${UPLOAD_DIR}`);
      console.log("\nAvailable endpoints:");
      console.log("  POST /registration        - Register new user");
      console.log("  POST /login               - Login and get token");
      console.log(
        "  GET  /profile             - Get user profile (auth required)"
      );
      console.log(
        "  PUT  /profile/update      - Update profile (auth required)"
      );
      console.log(
        "  PUT  /profile/image       - Upload profile image (auth required)"
      );
      console.log("  GET  /banner              - Get banners list");
      console.log(
        "  GET  /services            - Get services list (auth required)"
      );
      console.log(
        "  GET  /balance             - Get user balance (auth required)"
      );
      console.log(
        "  POST /topup               - Top up balance (auth required)"
      );
      console.log(
        "  POST /transaction         - Create transaction (auth required)"
      );
      console.log(
        "  GET  /transaction/history - Get transaction history (auth required)"
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

export default app;
