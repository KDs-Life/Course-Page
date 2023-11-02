import asyncHandler from "../utils/asyncHandler.js";
import pool from "../services/db.js";

//Bookings
export const getBookings = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT bookings.activities_id, activities.title , activities.startdate ,COUNT(bookings.activities_id) as bookings, sum(bookings.quantity), activities.maxslots FROM bookings JOIN activities ON activities.id = bookings.activities_id WHERE activities.startdate >= NOW() GROUP BY bookings.activities_id,activities.title , activities.startdate, activities.maxslots ORDER BY activities.startdate ASC;"
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Bookings not found" });
  }
});

export const getBookingsByActivity = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT a.title, u.email, b.quantity FROM bookings AS b JOIN activities AS a ON a.id = b.activities_id JOIN users AS u ON u.id = b.users_id WHERE b.activities_id = $1 GROUP BY b.activities_id, a.title, u.email, b.quantity",
      [id]
    );
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Bookings for activity not found" });
  }
});

//Users
export const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const existingUser = await pool.query(
      "SELECT id, email, firstname, lastname, role, created, address_id FROM users;"
    );
    if (existingUser.rowCount !== 0) {
      return res
        .status(200)
        .send({ status: "success", data: existingUser.rows });
    } else res.status(404).send({ status: "error", message: "No Users found" });
  } catch (error) {
    next(error);
  }
});

//Activites
export const getActivities = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM activities;");
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "No activities found" });
  }
});
