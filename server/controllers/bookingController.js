import Booking from "../models/Booking.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();

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

/* Create booking as Admin 

  export const createBooking = asyncHandler(async (req, res, next) => {

    const { userId, activityId, quantity, price } = req.body;

    const activity = await Activity.findById(activityId);

    const user = await User.findById(userId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const newBooking = await Post.create({ userId, activityId, quantity, price });
    
    res.json(newBooking);
  });
  */

export const checkSlotBookings = async (req, res, next) => {
  try {
    const agg = [
      {
        $unwind: "$bookings",
      },
      {
        $group: {
          _id: "$bookings.activity",
          quantity: {
            $sum: "$bookings.quantity",
          },
        },
      },
    ];
    const checkSlots = await User.aggregate(agg);
    if (!checkSlots.length) {
      return res
        .status(404)
        .json({ message: "no booked activities not found" });
    }
    res.json(checkSlots);
  } catch (error) {
    next(error);
  }
};

export const checkSlotBookingsById = async (req, res, next) => {
  try {
    const agg = [
      {
        $unwind: "$bookings",
      },
      {
        $group: {
          _id: "$bookings.activity",
          quantity: {
            $sum: "$bookings.quantity",
          },
        },
      },
      {
        $match: {
          _id: req.params.id,
        },
      },
    ];
    const checkSlots = await User.aggregate(agg);
    if (!checkSlots.length) {
      return res.status(404).json({ message: "Actitivy not found" });
    }
    res.json(checkSlots);
  } catch (error) {
    next(error);
  }
};
