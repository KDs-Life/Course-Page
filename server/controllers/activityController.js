import asyncHandler from "../utils/asyncHandler.js";
import pool from "../services/db.js";

export const getActivities = asyncHandler(async (req, res) => {
  try {
  const result = await pool.query("SELECT * FROM activities;");
  return res.status(200).json(result.rows);
  }
  catch (error) {
    res.status(500).json({ message: "Activitiy not found" });
  }
});

export const getActivityByID = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM activities WHERE id = $1;", [id]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Activity not found" });
  }
});

export const createActivity = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    active,
    startdate,
    minslots,
    maxslots,
    requirements,
    address_id,
    image_url,
    image_alt,
    price,
    category,
    published,
  } = req.body;

  const result = await pool.query(
    "INSERT INTO activities (title, description, active, startdate, minslots, maxslots, requirements, address_id, image_url, image_alt, price, category, published) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;",
    [
      title,
      description,
      active,
      startdate,
      minslots,
      maxslots,
      requirements,
      address_id,
      image_url,
      image_alt,
      price,
      category,
      published,
    ]
  );

  res.status(200).json(result.rows[0]);
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