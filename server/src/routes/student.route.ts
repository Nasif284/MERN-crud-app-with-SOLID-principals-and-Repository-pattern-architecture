import { Router } from "express";
import { studentController } from "../di/container";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

// Apply auth middleware to all routes
router.use(authenticate, authorize(["STUDENT"]));

router.get("/profile", studentController.getProfile);
router.put("/profile", studentController.updateProfile);

export default router;