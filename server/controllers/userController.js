import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const email = req.body.email.trim();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // get user data and return
    const data = {
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      bookings: existingUser.bookings,
      username: existingUser.email,
      member_since: existingUser.createdAt,
    };
    return res.status(409).send({ status: "success", data });
  } else
    res.status(404).send({ status: "error", message: "No Userdata found" });
});
