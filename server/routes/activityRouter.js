import { Router } from "express";
import * as activityController from "../controllers/activityController.js";

const activityRouter = Router();

activityRouter.route("/").get(activityController.getActivities);
activityRouter.route("/:id").get(activityController.getActivityById);

export default activityRouter;
