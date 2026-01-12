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

router.post(
  "/registration",
  validate(registrationSchema),
  membershipController.register
);
router.post("/login", validate(loginSchema), membershipController.login);
router.get("/profile", authenticate, membershipController.getProfile);
router.put(
  "/profile/update",
  authenticate,
  validate(updateProfileSchema),
  membershipController.updateProfile
);
router.put(
  "/profile/image",
  authenticate,
  handleProfileImageUpload,
  membershipController.updateProfileImage
);

export default router;
