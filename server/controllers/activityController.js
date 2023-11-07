import asyncHandler from "../utils/asyncHandler.js";
import pool from "../services/db.js";

export const getActivities = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query(
      //"SELECT * FROM activities WHERE startdate > NOW() AND active = true ORDER BY startdate;"
      "SELECT a.title, a.id, a.description, a.image_url, a.minslots, a.maxslots, a.price, a.startdate, SUM(b.quantity) AS total_quantity FROM bookings AS b right JOIN activities AS a ON b.activities_id = a.id WHERE a.startdate > NOW() AND a.active = true GROUP BY a.maxslots, a.title, a.id, a.description, a.image_url, a.minslots, a.price, a.startdate ORDER BY a.startdate ASC;"
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Activitiy not found" });
  }
});

export const getActivityByID = asyncHandler(async (req, res) => {
  try {
    req.params.id = parseInt(req.params.id);
    const { id } = req.params;
    if (!isNaN(id)) {
      const result = await pool.query(
        //"SELECT * FROM activities WHERE id = $1;"
        "SELECT a.title, a.id, a.description, a.image_url, a.minslots, a.maxslots, a.price, a.startdate, SUM(b.quantity) AS total_quantity FROM bookings AS b right JOIN activities AS a ON b.activities_id = a.id WHERE a.id = $1 AND a.startdate > NOW() AND a.active = true GROUP BY a.maxslots, a.title, a.id, a.description, a.image_url, a.minslots, a.price, a.startdate ORDER BY a.startdate ASC;",
        [id]
      );
      return res.status(200).json(result.rows[0]);
    } else
      res
        .status(500)
        .json({ message: "Activity not found", error: error.message });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Activity not found", error: error.message });
  }
});

export const getRandomActivitiesFrontpage = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT a.title, a.id, a.image_url, a.minslots, a.maxslots, a.price, a.startdate, (a.maxslots-SUM(b.quantity)) AS freeSlots FROM bookings AS b RIGHT JOIN activities AS a ON b.activities_id = a.id WHERE a.startdate > NOW() AND a.active = true GROUP BY a.maxslots, a.title, a.id, a.description, a.image_url, a.minslots, a.price, a.startdate ORDER BY a.startdate ASC LIMIT 6;"
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching activities" });
  }
});

export const getActivityByIDCheckBookings = asyncHandler(async (req, res) => {
  try {
    req.params.id = parseInt(req.params.id);
    const { id } = req.params;
    if (!isNaN(id)) {
      const result = await pool.query(
        "SELECT * FROM activities WHERE id = $1;",
        [id]
      );
      const totalQuantityResult = await pool.query(
        "SELECT b.activities_id, SUM(b.quantity) AS total_quantity, a.maxslots FROM bookings AS b JOIN activities AS a ON b.activities_id = a.id WHERE b.activities_id = $1 GROUP BY b.activities_id, a.maxslots ORDER BY b.activities_id ASC;",
        [id]
      );

      if (
        totalQuantityResult.rows[0].total_quantity >=
        totalQuantityResult.rows[0].maxslots
      ) {
        return res.status(400).json({ message: "Activity is fully booked" });
      }
      return res.status(200).json(result.rows[0]);
    } else res.status(500).json({ message: "Activity not found" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Activity not found", error: error.message });
  }
});
