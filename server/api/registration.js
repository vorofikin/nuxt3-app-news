import UserController from "~/server/service/userController";

export default defineEventHandler(async (event) => {
    return UserController.registration(event);
});