import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseHandler.js";

export const authMiddleware = async(req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.token;

        console.log("token at auth middleware",token);

        // Check if token exists
        if (!token) {
            return errorResponse(res, "Authentication required. Please log in.", 401);
        }

        // Verify the token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        // Attach user data to the request object
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            username: decoded.username,
        };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return errorResponse(res, "Invalid or expired token. Please log in again.", 403);
    }
};



