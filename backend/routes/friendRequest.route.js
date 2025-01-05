import express from "express";

import { sendFriendRequest, acceptFriendRequest,cancelSendFriendRequest } from "../controllers/friendRequest.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/friend-requests-send', authMiddleware, sendFriendRequest);
router.post('/friend-requests/accept', authMiddleware, acceptFriendRequest);

router.post("/friend-requests/cancel", authMiddleware, cancelSendFriendRequest)

export default router;

