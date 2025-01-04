
import expres from "express";

const router = expres.Router();

import { signupController,loginController } from "../controllers/auth.controller";

router.post("/signup", signupController);

router.post("/login", loginController);

export default router;

