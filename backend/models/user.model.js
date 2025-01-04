import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true},
    password: { type: String, required: true },
    token:{type:String},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    receivedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    interests: [String], // Optional
},

    { timestamps: true }

);


const User = mongoose.model('User', userSchema);

export default User;

