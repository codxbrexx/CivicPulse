import { Router } from "express";
import { createSociety, getSocieties } from "../controllers/society.controller";
import { protect } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

// Create society (admin only)
router.post("/", protect, authorize("admin"), createSociety);

// Get all societies (admin only)
router.get("/", protect, authorize("admin"), getSocieties);

export default router;