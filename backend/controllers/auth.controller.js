import Joi from "joi";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

import jwt from "jsonwebtoken";

const signupSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    interests: Joi.array().items(Joi.string()).required(),
});

const signupController = async (req, res) => {
    try {
        const { username, email, password, interests } = req.body;

        // Validate the input
        const { error } = signupSchema.validate({ username, email, password, interests });
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        // Check if email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return errorResponse(res, "Email already exists.", 400);
            }
            if (existingUser.username === username) {
                return errorResponse(res, "Username already exists.", 400);
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 6);

        // Create the new user
        const newUser = new User({ username, email, password: hashedPassword, interests });
        await newUser.save();

        return successResponse(res, "User created successfully!", { userId: newUser._id }, 201);
    } catch (error) {
        console.error(error);
        return errorResponse(res, "Internal server error.", 500);
    }
};




const loginSchema = Joi.object({
    usernameOrEmail: Joi.string().required(),
    password: Joi.string().min(6).required(),
});



const loginController = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        // Validate the input
        const { error } = loginSchema.validate({ usernameOrEmail, password });
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        // Check if the user exists in the database
        const user = await User.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] });
        if (!user) {
            return errorResponse(res, "User not found.", 404);
        }

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return errorResponse(res, "Invalid credentials.", 401);
        }


        // Generate the token
        const token = jwt.sign(

            { userId: user._id, email: user.email, username: user.username },
            process.env.JWT_SECRET, // Use an environment variable for the secret
            { expiresIn: "1d" } // Token validity: 1 day

        );

        // Set the token as a cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevent client-side JavaScript access to the cookie
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000, // Cookie validity: 1 day
        });

        // Send success response
        const responseData = {
            userId: user._id,
            username: user.username,
            email: user.email,
            interests: user.interests,
            token, // Include the token in the response

        };

        return successResponse(res, "Login successful!", responseData, 200);

    } catch (error) {
        console.error(error);
        return errorResponse(res, "Internal server error.", 500);
    }
};


export {loginController,signupController};

