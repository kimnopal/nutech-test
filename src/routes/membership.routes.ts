import { Router } from "express";
import * as membershipController from "../controllers/membership.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { handleProfileImageUpload } from "../config/multer";
import {
  registrationSchema,
  loginSchema,
  updateProfileSchema,
} from "../validators/membership.validator";

const router = Router();

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Registrasi user baru
 *     description: Digunakan untuk melakukan registrasi User agar mendapat akses Token
 *     tags: [1. Module Membership]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationRequest'
 *     responses:
 *       200:
 *         description: Registrasi berhasil
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
 *                   example: Registrasi berhasil silahkan login
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Bad Request - Validasi gagal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/registration",
  validate(registrationSchema),
  membershipController.register
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     description: Digunakan untuk melakukan login dan mendapatkan JWT token
 *     tags: [1. Module Membership]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Unauthorized - Email atau password salah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 103
 *                 message:
 *                   type: string
 *                   example: Username atau password salah
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.post("/login", validate(loginSchema), membershipController.login);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     description: Digunakan untuk mendapatkan informasi profile User
 *     tags: [1. Module Membership]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan profile
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
 *                   $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized - Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 */
router.get("/profile", authenticate, membershipController.getProfile);

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Update user profile
 *     description: Digunakan untuk mengupdate data profile User
 *     tags: [1. Module Membership]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
 *     responses:
 *       200:
 *         description: Update profile berhasil
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
 *                   example: Update Profile berhasil
 *                 data:
 *                   $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized - Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 */
router.put(
  "/profile/update",
  authenticate,
  validate(updateProfileSchema),
  membershipController.updateProfile
);

/**
 * @swagger
 * /profile/image:
 *   put:
 *     summary: Upload profile image
 *     description: Digunakan untuk mengupdate atau mengupload profile image User
 *     tags: [1. Module Membership]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File image (jpeg/png)
 *     responses:
 *       200:
 *         description: Update profile image berhasil
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
 *                   example: Update Profile Image berhasil
 *                 data:
 *                   $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Bad Request - Format image tidak sesuai
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
router.put(
  "/profile/image",
  authenticate,
  handleProfileImageUpload,
  membershipController.updateProfileImage
);

export default router;
