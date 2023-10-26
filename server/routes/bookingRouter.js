import { Router } from "express";
import * as bookingController from "../controllers/bookingController.js";

const bookingRouter = Router();

bookingRouter.route("/checkAll").get(bookingController.checkSlotBookings);
bookingRouter.route("/check/:id").get(bookingController.checkSlotBookingsById);
bookingRouter.route("/").get(bookingController.getBookings);
bookingRouter.route("/:id").get(bookingController.getBookingById);

export default bookingRouter;
