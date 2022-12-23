import PostController from "~/server/service/postController";

export default defineEventHandler(async (event) => {
    return await PostController.getPost(event);
})