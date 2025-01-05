
import express from "express";

const router = express.Router();

import { signupController,loginController } from "../controllers/auth.controller.js";

router.post("/signup", signupController);

router.post("/login", loginController);

export default router;

