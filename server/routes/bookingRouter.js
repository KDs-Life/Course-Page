import { Router } from "express";
import * as bookingController from "../controllers/bookingController.js";

const bookingRouter = Router();

bookingRouter
  .route("/")
  .get(bookingController.getBookingsSQL)
  .post(bookingController.createBookingSQL);
bookingRouter.route("/:id").get(bookingController.getBookingsByIDSQL);

export default bookingRouter;
