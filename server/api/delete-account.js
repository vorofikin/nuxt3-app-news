import UserController from "~/server/service/userController";

export default defineEventHandler(async event => {
  return await UserController.deleteAccount(event);
})