import express from "express";
import {
  getPlatformStats,
  getAllUsers,
  deleteUser,
  getAllJobsAdmin,
  deleteJobAdmin,
} from "../controllers/adminController.js";
import { isAuthorized, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/stats", isAuthorized, isAdmin, getPlatformStats);
router.get("/users", isAuthorized, isAdmin, getAllUsers);
router.delete("/user/:id", isAuthorized, isAdmin, deleteUser);
router.get("/jobs", isAuthorized, isAdmin, getAllJobsAdmin);
router.delete("/job/:id", isAuthorized, isAdmin, deleteJobAdmin);

export default router;
