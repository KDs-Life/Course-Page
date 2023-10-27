import Activity from "../models/Activity.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import asyncHandler from "../utils/asyncHandler.js";
import * as userController from "../controllers/userController.js";
import pool from "../services/db.js";

/*<
export const getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find();

    if (!activities.length) {
      throw { statusCode: 404, message: "Activity not found" };
    }
    res.json(activities);
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activity.find({ _id: id });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (error) {
    next(error);
  }
};
*/

/*
export const bookActivity = async (req, res, next) => {

  try {
    const { userId, activityId, quantity, price } = req.body;

    const activity = await Activity.findById(activityId);

    const user = await User.findById(userId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, {$push:{"bookings":{activity: activityId, quantity: quantity, price: price}}}, {
      new: true,
    });

    /* Create new booking in bookings collection
    const booking = new Booking({
      user: userId,
      activity: activityId,
      quantity: quantity,
      price: price,
    });

    await booking.save();

    res.json(updatedUser);
  
  } catch (error) {
    next(error);
  }
}
*/



// SQL Part

export const getActivitiesSQL = asyncHandler(async (req, res) => {
  try {
  const result = await pool.query("SELECT * FROM activities;");
  return res.status(200).json(result.rows);
  }
  catch (error) {
    res.status(500).json({ message: "Activitiy not found" });
  }
});

export const getActivityByIDSQL = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM activities WHERE id = $1;", [id]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Activity not found" });
  }
});