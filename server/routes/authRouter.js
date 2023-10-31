import { Router } from "express";
import * as authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/login", authController.loginUser);
authRouter.post("/signup", authController.registerUser);
authRouter.get("/logout", authController.logoutUser);
authRouter.get("/autoLogin", authController.autoLogin);

export default authRouter;
