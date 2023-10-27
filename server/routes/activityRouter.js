import { Router } from "express";
import * as activityController from "../controllers/activityController.js";

const activityRouter = Router();

//activityRouter.route("/").get(activityController.getActivities);
//activityRouter.route("/").get(activityController.getActivitiesSQL);
activityRouter.route("/:id").get(activityController.getActivityByIDSQL);
activityRouter.route("/").get(activityController.getActivitiesSQL).post(activityController.createActivitySQL);
//activityRouter.route("/:id").get(activityController.getActivityById).post(activityController.bookActivity);

export default activityRouter;
