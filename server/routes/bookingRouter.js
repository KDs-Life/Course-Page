import { Router } from "express";
import * as bookingController from "../controllers/bookingController.js";

const bookingRouter = Router();

bookingRouter
  .route("/")
  .get(bookingController.getBookings)
  .post(bookingController.createBooking);
bookingRouter.route("/:id").get(bookingController.getBookingsByID);
bookingRouter.delete("/:id", bookingController.deleteBooking);

export default bookingRouter;
