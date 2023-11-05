import asyncHandler from "../utils/asyncHandler.js";
import pool from "../services/db.js";

export const getActivities = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM activities WHERE startdate > NOW() AND active = true ORDER BY startdate;"
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
        "SELECT * FROM activities WHERE id = $1;",
        [id]
      );
      return res.status(200).json(result.rows[0]);
    } else res.status(500).json({ message: "Activity not found" });
  } catch (error) {
    res.status(500).json({ message: "Activity not found" });
  }
});

export const getRandomActivitiesFrontpage = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM activities WHERE startdate > NOW() AND active = true ORDER BY RANDOM() LIMIT 6;"
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching activities" });
  }
});
