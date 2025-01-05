import Joi from "joi";
import User from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";

// Define Joi schema for validation
const friendRequestValidationSchema = Joi.object({
  senderId: Joi.string().required(),
  receiverId: Joi.string().required(),
});

// Utility function to validate input
const validateFriendRequest = (data) => {
  return friendRequestValidationSchema.validate(data);
};

// Utility function to find users and validate their existence
const findUsers = async (senderId, receiverId) => {
  const [sender, receiver] = await Promise.all([
    User.findById(senderId),
    User.findById(receiverId),
  ]);
  if (!sender) throw new Error("Sender not found.");
  if (!receiver) throw new Error("Receiver not found.");
  return { sender, receiver };
};

// Send Friend Request
export const sendFriendRequest = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.user.userId;

        // Validate input
        const { error } = friendRequestValidationSchema.validate({ senderId, receiverId });
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        // Check if sender and receiver exist
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return errorResponse(res, "Sender or Receiver not found.", 404);
        }

        // Check if request already exists
        if (sender.sentRequests.includes(receiverId)) {
            return errorResponse(res, "Friend request already sent.", 400);
        }

        // Add friend request
        sender.sentRequests.push(receiverId);
        receiver.receivedRequests.push(senderId);

        await sender.save();
        await receiver.save();

        // Emit event to notify the receiver in real-time
        const receiverSocketId = activeUsers.get(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("friendRequestReceived", {
                senderId,
                senderName: sender.name,
            });
        }

        return successResponse(res, "Friend request sent successfully.", { senderId, receiverId });
    } catch (error) {
        console.error("Error in sendFriendRequest:", error.message);
        return errorResponse(res, "Internal server error.", 500);
    }
};




// Cancel Friend Request
export const cancelSendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.userId;

    // Validate input
    const { error } = validateFriendRequest({ senderId, receiverId });
    if (error) return errorResponse(res, error.details[0].message, 400);

    // Find users
    const { sender, receiver } = await findUsers(senderId, receiverId);

    // Check if request exists
    if (!sender.sentRequests.includes(receiverId)) {
      return errorResponse(res, "Friend request not found.", 400);
    }

    // Remove friend request
    sender.sentRequests = sender.sentRequests.filter((id) => id !== receiverId);
    receiver.receivedRequests = receiver.receivedRequests.filter((id) => id !== senderId);

    await Promise.all([sender.save(), receiver.save()]);

    return successResponse(res, "Friend request cancelled successfully!", { senderId, receiverId });
  } catch (error) {
    console.error("Error in cancelSendFriendRequest:", error.message);
    return errorResponse(res, error.message || "Internal server error.", 500);
  }
};

// Accept Friend Request
export const acceptFriendRequest = async (req, res) => {
    try {
        const { senderId } = req.body;
        const receiverId = req.user.userId;

        // Validate input
        const { error } = validateFriendRequest({ senderId, receiverId });
        if (error) return errorResponse(res, error.details[0].message, 400);

        // Find users
        const { sender, receiver } = await findUsers(senderId, receiverId);

        // Check if request exists
        if (!receiver.receivedRequests.includes(senderId)) {
            return errorResponse(res, "Friend request not found.", 400);
        }

        // Update friendship
        sender.friends.push(receiverId);
        receiver.friends.push(senderId);

        // Remove from requests
        sender.sentRequests = sender.sentRequests.filter((id) => id !== receiverId);
        receiver.receivedRequests = receiver.receivedRequests.filter((id) => id !== senderId);

        await Promise.all([sender.save(), receiver.save()]);

        return successResponse(res, "Friend request accepted successfully!", { senderId, receiverId });
    } catch (error) {
        console.error("Error in acceptFriendRequest:", error.message);
        return errorResponse(res, error.message || "Internal server error.", 500);
    }
};



