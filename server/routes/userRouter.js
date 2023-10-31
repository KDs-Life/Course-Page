import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/profile", userController.getUser);
userRouter.put("/profile/address/:id", userController.updateUser);

export default userRouter;
