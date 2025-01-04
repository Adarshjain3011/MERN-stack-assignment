const express = require('express');
const { sendFriendRequest, acceptFriendRequest } = require('../controllers/friendRequest.controller.js');

const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/friend-requests', authMiddleware, sendFriendRequest);
router.post('/friend-requests/accept', authMiddleware, acceptFriendRequest);

export default router;

