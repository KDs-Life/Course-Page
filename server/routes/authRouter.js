import { Router } from "express";
import * as authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", authController.registerUser);
authRouter.post("/login", authController.loginUser);

export default authRouter;
