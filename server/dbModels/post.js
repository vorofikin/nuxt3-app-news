import mongoose from "mongoose";

const Post = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number,  required: false, default: 0 }
});

const PostModel = mongoose.model("Post", Post);
export default PostModel;