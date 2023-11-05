import { Router } from "express";
import * as dashboardController from "../controllers/dashboardController.js";

const dashboardRouter = Router();

//TODO: finish Dashboard methods
dashboardRouter.get("/bookings", dashboardController.getBookings);
dashboardRouter.get("/bookings/:id", dashboardController.getBookingsByActivity);
dashboardRouter.get("/users", dashboardController.getUsers);
//dashboardRouter.get("/users/:id", dashboardController.getUserById);
dashboardRouter
  .get("/activities", dashboardController.getActivities)
  .post("/activities", dashboardController.createActivity);
dashboardRouter
  .get("/activities/:id", dashboardController.getActivityById)
  .put("/activities/:id", dashboardController.updateActivityById)
  .delete("/activities/:id", dashboardController.deleteActivityById);
dashboardRouter.get("/stats/users", dashboardController.getStatsUsers);
dashboardRouter.get("/stats/bookings", dashboardController.getStatsBookings);
dashboardRouter.get(
  "/stats/activities",
  dashboardController.getStatsActivities
);

export default dashboardRouter;
