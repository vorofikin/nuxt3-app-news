import PostModel from "~/server/dbModels/post";

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
}

const PostController = new Controller();
export default PostController;