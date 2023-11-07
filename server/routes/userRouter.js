import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/all", userController.getAllUser);
userRouter.post("/profile", userController.getUser);
userRouter.put("/profile", userController.updateUser);
userRouter.put("/password", userController.updatePassword);
userRouter.get("/bookings/:email", userController.getBookings);

export default userRouter;
