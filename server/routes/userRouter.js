import { Router } from "express";
import * as userController from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyJWT.js";

const userRouter = Router();

userRouter.post("/profile", verifyToken, userController.getUser);

export default userRouter;
