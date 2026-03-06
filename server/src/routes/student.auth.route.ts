import { Router } from "express";
import { authController } from "../di/container";

const router = Router();

router.post("/login", authController.loginStudent);
router.post("/register", authController.registerStudent);
router.post("/refresh-token", authController.refreshToken);

export default router;
