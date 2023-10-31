import asyncHandler from "../utils/asyncHandler.js";
import pool from "../services/db.js";

export const getBookings = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings;");
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Booking not found" });
  }
});

export const getBookingsByID = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM bookings WHERE id = $1;", [
      id,
    ]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Booking not found" });
  }
});

export const createBooking = asyncHandler(async (req, res) => {
  const { userId, activityId, quantity, price } = req.body;

  const userResult = await pool.query("SELECT * FROM users WHERE id = $1;", [
    userId,
  ]);
  const activityResult = await pool.query(
    "SELECT * FROM activities WHERE id = $1;",
    [activityId]
  );

  if (userResult.rows.length === 0 || activityResult.rows.length === 0) {
    return res.status(404).json({ message: "User or Activity not found" });
  }

  const totalQuantityResult = await pool.query(
    "SELECT b.activities_id, SUM(b.quantity) AS total_quantity, a.maxslots FROM bookings AS b JOIN activities AS a ON b.activities_id = a.id WHERE b.activities_id = $1 GROUP BY b.activities_id, a.maxslots ORDER BY b.activities_id ASC;",
    [activityId]
  );

  if (
    totalQuantityResult.rows[0].total_quantity >=
    totalQuantityResult.rows[0].maxslots
  ) {
    return res.status(400).json({ message: "Activity is fully booked" });
  }

  const result = await pool.query(
    "INSERT INTO bookings (users_id, activities_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *;",
    [userId, activityId, quantity, price]
  );

  res.status(201).json(result.rows[0]);
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM bookings WHERE id = $1 RETURNING *;", [id]);
    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting booking" });
  }
});