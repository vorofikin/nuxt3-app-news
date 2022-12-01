import UserModel from "~/server/dbModels/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "~/server/dbModels/user";

class Controller {
    generateToken(name) {
        const payload = { name };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
    }

    async registration(event) {
        const body = await readBody(event);
        console.log(body);
        const { firstName, lastName, email, password } = body;
        const candidate = await UserModel.findOne({ email });

        if (candidate) {
            return sendError(event, createError({
                statusCode: 400,
                statusMessage: `User with email ${email} already exists`
            }));
        }

        const hashPass = bcrypt.hashSync(password, 7);
        const token = this.generateToken(email);
        const user = new UserModel({
            email,
            password: hashPass,
            firstName,
            lastName
        });
        await user.save();
        return {
            token,
            email,
            id: user._id,
            firstName,
            lastName
        }
    }

    async login(event) {
        const body = await readBody(event);
        const { email, password } = body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return sendError(event, createError({
                statusCode: 400,
                statusMessage: `User with email ${email} is not registered yet`
            }));
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return sendError(event, createError({
                statusCode: 400,
                statusMessage: "Wrong password"
            }));
        }

        const token = this.generateToken(email);
        return {
            token,
            email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id,
        }
    }

    async deleteAccount() {

    }
}

const UserController = new Controller();
export default UserController;