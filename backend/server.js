
import express from "express";

import http from "http";

import { Server } from "socket.io";

import connectDB from "./config/db.config.js";

import userRoutes from "./routes/user.route.js";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";


dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow your frontend's origin here
    },
});


// Store active user sockets
const activeUsers = new Map();

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Add user to active users when they connect
    socket.on("register", (userId) => {
        activeUsers.set(userId, socket.id);
        console.log(`${userId} registered with socket ID ${socket.id}`);
    });

    // Remove user from active users when they disconnect
    socket.on("disconnect", () => {
        activeUsers.forEach((value, key) => {
            if (value === socket.id) {
                activeUsers.delete(key);
            }
        });
        console.log(`User disconnected: ${socket.id}`);
    });
});


app.listen(4000,()=>{

    console.log("listening on port 4000");


})

app.get("/",(req,res)=>{

    res.send("hello world");

    
})


app.use("/api/",userRoutes);

