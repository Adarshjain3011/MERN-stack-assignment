import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.config.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', // Change this to your frontend URL in production
    credentials: true, // Enable cookies and credentials
  })
);

// Database connection
connectDB();

// Create HTTP server and Socket.io instance
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Match with the frontend origin
    methods: ["GET", "POST"], // Allowed HTTP methods
    credentials: true, // Allow cookies if necessary
  },
});

// Store active user sockets in a Map
export const activeUsers = new Map();

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Register a user with their socket ID
  socket.on("register", (userId) => {
    activeUsers.set(userId, socket.id);
    console.log(`${userId} registered with socket ID ${socket.id}`);
  });

  // Listen for messages to be sent to specific users
  socket.on("send-message", ({ receiverId, message }) => {
    const receiverSocketId = activeUsers.get(receiverId);

    if (receiverSocketId) {
      // Emit the message to the receiver
      io.to(receiverSocketId).emit("new-message", { senderId: socket.id, message });
      console.log(`Message sent to ${receiverId}`);
    } else {
      console.log(`Receiver ${receiverId} is not online.`);
    }
  });

  // Handle user disconnections and remove from active users
  socket.on("disconnect", () => {
    activeUsers.forEach((value, key) => {
      if (value === socket.id) {
        activeUsers.delete(key);
        console.log(`User ${key} disconnected.`);
      }
    });
  });
});

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Use user routes
app.use("/api",authRoutes);

app.use("/api",userRoutes);


// Start the Express server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
