import { Router } from "express";
import * as activityController from "../controllers/activityController.js";

const activityRouter = Router();

activityRouter.route("/activities").get(activityController.getActivities);
activityRouter.route("/activities/:id").get(activityController.getActivityById);

export default activityRouter;