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
    res.status(500).json({ status: "error", message: "Bookings not found" });
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
    res
      .status(500)
      .json({ status: "error", message: "Bookings for activity not found" });
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
    const query =
      "SELECT activities.*, COUNT(bookings.activities_id) as bookings FROM activities LEFT JOIN bookings ON bookings.activities_id = activities.id GROUP BY bookings.activities_id, activities.id ORDER BY activities.startdate ASC;";
    const result = await pool.query(query);
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ status: "error", message: "No activities found" });
  }
});

export const getActivityById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM activities WHERE id = $1;", [
      id,
    ]);
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ status: "error", message: "Activity not found" });
  }
});

export const createActivity = asyncHandler(async (req, res) => {
  try {
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
    } = req.body;

    const result = await pool.query(
      "INSERT INTO activities (title, description, active, startdate, minslots, maxslots, requirements, address_id, image_url, image_alt, price, category, published) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()) RETURNING *;",
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
      ]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", message: "Could not create activity" });
  }
});

export const updateActivityById = asyncHandler(async (req, res) => {
  try {
    const {
      id,
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
    } = req.body;
    const query =
      "UPDATE activities SET title = $1, description = $2, active = $3, startdate = $4, minslots = $5, maxslots = $6, requirements = $7, address_id = $8, image_url = $9, image_alt = $10, price = $11, category = $12 WHERE id = $13 RETURNING *;";
    const result = await pool.query(query, [
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
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", message: "Could not create activity" });
  }
});

export const deleteActivityById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM activities WHERE id = $1 RETURNING id;";
    const result = await pool.query(query, [id]);
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Could not delete activity",
    });
  }
});

//Admin Stats
export const getStatsUsers = asyncHandler(async (req, res) => {
  try {
    const query = "SELECT count(id) FROM users;";
    const result = await pool.query(query);
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ status: "error", message: "Userstats failed" });
  }
});

export const getStatsBookings = asyncHandler(async (req, res) => {
  try {
    const query = "SELECT count(id) FROM bookings;";
    const result = await pool.query(query);
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ status: "error", message: "Userstats failed" });
  }
});

export const getStatsActivities = asyncHandler(async (req, res) => {
  try {
    const query = "SELECT count(id) FROM activities WHERE active = true;";
    const result = await pool.query(query);
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ status: "error", message: "Userstats failed" });
  }
});
