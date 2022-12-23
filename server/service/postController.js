import PostModel from "~/server/dbModels/post";
import { uploadToCloudinary } from "~/utils/cloudinary";

class Controller {
  async fetchPosts(event) {
    try {
      const posts = await PostModel.find();
      return posts;
    } catch (e) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "something went wrong"
      }));
    }
  }

  async addPost(event) {
    const body = await readBody(event);
    const { file, text, title } = body;
    const cloudinaryResponse = await uploadToCloudinary(file);
    const post = new PostModel({
      title,
      text,
      url: cloudinaryResponse.public_id
    });
    await post.save();
  }

  async getPost(event) {
    try {
      const body = await readBody(event);
      const post = await PostModel.findById(body.id);
      return post;
    } catch (e) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "something went wrong"
      }));
    }
  }

}

const PostController = new Controller();
export default PostController;