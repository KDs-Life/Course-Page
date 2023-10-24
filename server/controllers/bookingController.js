import Booking from "../models/Booking.js";

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Activity.find();

    if (!bookings.length) {
      throw { statusCode: 404, message: "Booking not found" };
    }
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const bookings = await Booking.find({ _id: id });
  
      if (!bookings) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  };