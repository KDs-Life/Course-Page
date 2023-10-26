import { Router } from "express";
import * as authController from "../controllers/authController.js";
import verifyToken from "../middlewares/verifyJWT.js";

const authRouter = Router();

authRouter.post("/login", authController.loginUser);
authRouter.post("/signup", authController.registerUser);
authRouter.get("/logout", authController.logoutUser);
authRouter.get("/refresh", verifyToken, authController.refreshToken);

export default authRouter;
