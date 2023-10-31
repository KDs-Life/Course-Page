import asyncHandler from "../utils/asyncHandler.js";
import pool from "../services/db.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const email = req.body.email.trim();
  try {
    const existingUser = await pool.query(
      "SELECT users.email as email, users.created as created, users.lastname as lastname, users.firstname as firstname, users.role as role, count(b.*) as bookings FROM users LEFT JOIN bookings as b ON users.id = b.users_id WHERE users.email = $1 GROUP BY users.email, users.role, users.created, users.lastname, users.firstname;",
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
      return res.status(200).send({ status: "success", data });
    } else
      res.status(404).send({ status: "error", message: "No Userdata found" });
  } catch (error) {
    next(error);
  }
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { id, street, housenumber, zip, city, country, description } = req.body;

  try {
    const catchId = await pool.query(
      "SELECT address_id FROM users WHERE id = $1;",
      [id]
    );
    const addressId = catchId.rows[0].address_id;

    await pool.query(
      "UPDATE address SET street = $1, housenumber = $2, zip = $3, city = $4, country = $5, description = $6 WHERE id = $7;",
      [street, housenumber, zip, city, country, description, addressId]
    );

    res.status(200).json({ message: "Address details updated successfully" });
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
