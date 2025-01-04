import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true},
    password: { type: String, required: true },
    token:{type:String},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    interests: [String], // Optional
},

    { timestamps: true }

);


module.exports = mongoose.model('User', userSchema);


