import { Router } from "express";
import { authController } from "../di/container";

const router = Router();

router.post("/login", authController.loginAdmin);
router.post("/register", authController.registerAdmin);

export default router;
