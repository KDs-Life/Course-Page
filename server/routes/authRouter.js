import { Router } from "express";
import * as authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/login", authController.loginUser);
authRouter.post("/login2", authController.loginUser2);
authRouter.post("/signup", authController.registerUser);
authRouter.get("/logout", authController.logoutUser);
authRouter.get("/test", authController.testSQL);

export default authRouter;
