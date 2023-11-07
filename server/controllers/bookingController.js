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
  const { email, activity_id, quantity, price,} = req.body;

  const userResult = await pool.query("SELECT id FROM users WHERE email = $1;", [
    email,
  ]);
  const activityResult = await pool.query(
    "SELECT * FROM activities WHERE id = $1;",
    [activity_id]
  );

  if (userResult.rows.length === 0 || activityResult.rows.length === 0) {
    return res.status(404).json({ message: "User or Activity not found" });
  }

  const totalQuantityResult = await pool.query(
    " SELECT a.id, SUM(b.quantity) AS total_quantity, a.maxslots FROM bookings AS b RIGHT JOIN activities AS a ON b.activities_id = a.id WHERE a.id = $1 GROUP BY a.id, a.maxslots, b.quantity ORDER BY a.id ASC;",
    [activity_id]
  );

  if (
    totalQuantityResult.rows[0].total_quantity >=
    totalQuantityResult.rows[0].maxslots
  ) {
    return res.status(400).json({ message: "Activity is fully booked" });
  }
  const result = await pool.query(
    "INSERT INTO bookings (users_id, activities_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *;",
    [userResult.rows[0].id, activity_id, quantity, price]
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