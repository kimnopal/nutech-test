import { Router } from "express";
import * as informationController from "../controllers/information.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/banner", informationController.getBanners);
router.get("/services", authenticate, informationController.getServices);

export default router;
