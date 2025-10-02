import express from "express";
import { register, login } from "../controllers/user.controller.js"

const UserRouter = express.Router();

UserRouter.route("/register").post(register)
UserRouter.route("/login").post(login)
export default UserRouter;