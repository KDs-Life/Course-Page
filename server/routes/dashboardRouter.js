import { Router } from "express";
import * as dashboardController from "../controllers/dashboardController.js";

const dashboardRouter = Router();

//TODO: finish Dashboard methods
dashboardRouter.get("/bookings", dashboardController.getBookings);
dashboardRouter.get("/bookings/:id", dashboardController.getBookingsByActivity);
dashboardRouter.get("/users", dashboardController.getUsers);
//dashboardRouter.get("/users/:id", dashboardController.getUserById);
dashboardRouter.get("/activities", dashboardController.getActivities);
dashboardRouter.get("/activities/:id", dashboardController.getActivityById);

export default dashboardRouter;
