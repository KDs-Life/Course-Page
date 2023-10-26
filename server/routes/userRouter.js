import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/profile", userController.getUser);

export default userRouter;
