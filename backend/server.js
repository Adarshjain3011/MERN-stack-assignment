
import express from "express";

import connectDB from "./config/db.config.js";

import userRoutes from "./routes/user.route.js";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";


dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

connectDB();


app.listen(4000,()=>{

    console.log("listening on port 4000");


})

app.get("/",(req,res)=>{

    res.send("hello world");

    
})


app.use("/api/",userRoutes);

