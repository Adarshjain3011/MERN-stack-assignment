import User from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import Joi from "joi";

const searchUserValidation = Joi.object({
    userNameOrEmail: Joi.string().required(),
});

const searchUser = async (req, res) => {
    try {
        const { userNameOrEmail } = req.params;

        // Validate the input
        const { error } = searchUserValidation.validate({ userNameOrEmail });
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        // Perform a case-insensitive search for username or email
        const user = await User.find({
            $or: [
                { username: { $regex: userNameOrEmail, $options: "i" } },
                { email: { $regex: userNameOrEmail, $options: "i" } },
            ],
        });

        // Check if no users are found
        if (!user || user.length === 0) {
            return errorResponse(res, "No users found matching the search criteria.", 404);
        }

        // Send the found users as the response
        return successResponse(res, "Users found successfully!", { users: user });
    } catch (error) {
        console.error(error);
        return errorResponse(res, "Internal server error.", 500);
    }
};

export default searchUser;

