import asyncHandler from "../utils/asyncHandler.js";
import pool from "../services/db.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const email = req.body.email.trim();
  try {
    const existingUser = await pool.query(
      "SELECT users.email as email, users.created as created, users.lastname as lastname, users.firstname as firstname, users.phone as phone, a.street as street, a.housenumber as housenumber, a.city as city, a.country as country, users.role as role, count(b.*) as bookings FROM users LEFT JOIN bookings as b ON users.id = b.users_id LEFT JOIN address as a ON users.address_id = a.id WHERE users.email = $1 GROUP BY users.email, users.phone, users.role, users.created, users.lastname, users.firstname, a.street, a.housenumber,	a.city, a.country;",
      [email]
    );
    if (existingUser.rowCount !== 0) {
      const data = {
        firstname: existingUser.rows[0].firstname,
        lastname: existingUser.rows[0].lastname,
        bookings: existingUser.rows[0].bookings, //join bookings on id (user)
        username: existingUser.rows[0].email,
        role: existingUser.rows[0].role,
        member_since: existingUser.rows[0].created,
      };
      return res
        .status(200)
        .send({ status: "success", data: existingUser.rows });
    } else
      res.status(404).send({ status: "error", message: "No Userdata found" });
  } catch (error) {
    next(error);
  }
});

//Admin Functions
export const getAllUser = asyncHandler(async (req, res, next) => {
  try {
    const existingUser = await pool.query(
      "SELECT id, email, firstname, lastname, role, created, address_id FROM users;"
    );
    if (existingUser.rowCount !== 0) {
      return res
        .status(200)
        .send({ status: "success", data: existingUser.rows });
    } else
      res.status(404).send({ status: "error", message: "No Userdata found" });
  } catch (error) {
    next(error);
  }
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const {
    email,
    street,
    housenumber,
    zip,
    city,
    country,
    description,
    firstname,
    lastname,
    phone,
  } = req.body;

  try {
    const newAddress = await pool.query(
      "INSERT INTO address (street, housenumber, zip, city, country, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
      [street, housenumber, zip, city, country, description]
    );
    const addressId = newAddress.rows[0].id;

    await pool.query(
      "UPDATE users SET firstname = $1, lastname = $2, phone = $3, address_id = $4 WHERE email = $5;",
      [firstname, lastname, phone, addressId, email]
    );

    res.status(200).json({ message: "Address details updated successfully" });
  } catch (error) {
    next(error);
  }
});
