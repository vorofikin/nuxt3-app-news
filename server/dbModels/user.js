import mongoose from "mongoose";

const User = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const UserModel = mongoose.model("User", User);
export default UserModel;