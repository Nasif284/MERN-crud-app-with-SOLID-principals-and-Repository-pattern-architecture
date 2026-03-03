import { Router, Request, Response } from "express";
import { adminController, syncService } from "../di/container";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate, authorize(["ADMIN"]));

router.get("/students", adminController.getAllStudents);
router.put("/students/:id/block", adminController.blockStudent);
router.put("/students/:id/unblock", adminController.unblockStudent);
router.put("/students/:id", adminController.updateStudent);


router.post("/db/resync", async (req: Request, res: Response) => {
    try {
        const result = await syncService.fullResync();
        res.json({ success: true, ...result });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
