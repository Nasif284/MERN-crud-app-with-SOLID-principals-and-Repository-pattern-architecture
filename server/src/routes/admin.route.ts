import { Router } from "express";
import { adminController } from "../di/container";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

// Apply auth middleware to all routes
router.use(authenticate, authorize(["ADMIN"]));

router.get("/students", adminController.getAllStudents);
router.put("/students/:id/block", adminController.blockStudent);
router.put("/students/:id/unblock", adminController.unblockStudent);
router.put("/students/:id", adminController.updateStudent);

export default router;
