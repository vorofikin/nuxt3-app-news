import PostController from "~/server/service/postController";

export default defineEventHandler(async (event) => {
    return PostController.fetchPosts(event);
});