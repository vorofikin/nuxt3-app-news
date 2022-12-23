import mongoose from "mongoose";

const Post = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    url: { type: String }
});

const PostModel = mongoose.model("Post", Post);
export default PostModel;