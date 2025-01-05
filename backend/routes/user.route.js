
import express from "express";

const router = express.Router();

import { searchUser } from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

router.get("/searchUser/:userNameOrEmail",authMiddleware, searchUser);

export default router;

