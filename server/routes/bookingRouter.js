import { Router } from "express";
import * as bookingController from "../controllers/bookingController.js";

const bookingRouter = Router();

//bookingRouter.route("/checkAll").get(bookingController.checkBookings);
//bookingRouter.route("/check/:id").get(bookingController.checkSlotBookingsById);
//bookingRouter.route("/").get(bookingController.getBookings);
//bookingRouter.route("/:id").get(bookingController.getBookingById).post(bookingController.createBooking);
bookingRouter.route("/").get(bookingController.getBookingsSQL).post(bookingController.createBookingSQL);
bookingRouter.route("/:id").get(bookingController.getBookingsByIDSQL);

export default bookingRouter;
