import asyncHandler from "../utils/asyncHandler.js";
import pool from "../services/db.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const email = req.body.email.trim();
  try {
    const existingUser = await pool.query(
      "SELECT users.email as email, users.created as created, users.lastname as lastname, users.firstname as firstname, users.role as role, count(b.*) as bookings FROM users JOIN bookings as b ON users.id = b.users_id WHERE users.email = $1 GROUP BY users.email, users.role, users.created, users.lastname, users.firstname;",
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
  // TODO: Update userdetails (address for bookings?!)
  const { id, firstname, lastname } = req.body;
});
