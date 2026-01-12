import { Router } from "express";
import * as informationController from "../controllers/information.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /banner:
 *   get:
 *     summary: Get banners
 *     description: Digunakan untuk mendapatkan list banner
 *     tags: [2. Module Information]
 *     responses:
 *       200:
 *         description: Sukses mendapatkan list banner
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
 *                   example: Sukses
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Banner'
 */
router.get("/banner", informationController.getBanners);

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get services
 *     description: Digunakan untuk mendapatkan list Service/Layanan PPOB
 *     tags: [2. Module Information]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan list services
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
 *                   example: Sukses
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 *       401:
 *         description: Unauthorized - Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 */
router.get("/services", authenticate, informationController.getServices);

export default router;
