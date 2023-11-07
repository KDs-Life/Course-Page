import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import pool from "../services/db.js";

const JWT_OPTIONS_ACCESS = {
  algorithm: process.env.JWT_ALGORITHM,
  expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
};

const JWT_OPTIONS_REFRESH = {
  algorithm: process.env.JWT_ALGORITHM,
  expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
};

export const getUser = asyncHandler(async (req, res, next) => {
  const email = req.body.email.trim();
  try {
    const existingUser = await pool.query(
      `SELECT users.email as email, users.created as created, users.lastname as lastname, users.firstname as firstname, 
        users.phone as phone, a.street as street, a.housenumber as housenumber, a.city as city, a.country as country, a.zip as zip, 
        users.role as role, count(b.*) as bookings 
       FROM users 
       LEFT JOIN bookings as b ON users.id = b.users_id 
       LEFT JOIN address as a ON users.address_id = a.id 
       WHERE users.email = $1 
       GROUP BY users.email, users.phone, users.role, users.created, users.lastname, users.firstname, a.street,
        a.housenumber,	a.city, a.country, a.zip;`,
      [email]
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
    lastname,
    firstname,
    phone,
    street,
    housenumber,
    city,
    zip,
    country,
    email,
  } = req.body;
  try {
    const checkAddressId = await pool.query(
      "SELECT address_id FROM users WHERE email=$1 AND address_id != NULL;",
      [email]
    );
    if (checkAddressId.rowCount === 0) {
      // when users.address_id is empty: UPSERT
      const query = `WITH new_address as (
          INSERT INTO address (street,housenumber,zip,city,country,email) VALUES ($4,$5,$8,$6,$7,$9)
          RETURNING id
          )
          UPDATE users SET (address_id,lastname,firstname,phone) = ((select id from new_address),$1,$2,$3) WHERE email = $9;`;
      const upsert = await pool.query(query, [
        lastname,
        firstname,
        phone,
        street,
        housenumber,
        city,
        country,
        zip,
        email,
      ]);
    } else {
      // when users.address_id is not empty: TRANSACTION TIME!
      await pool.query("BEGIN");
      const upUsers = await pool.query(
        `UPDATE users SET lastname = $1, firstname = $2, phone = $3 WHERE email = $4;`,
        [lastname, firstname, phone, email]
      );
      const upAddress = await pool.query(
        `UPDATE address
         SET street = $1, housenumber = $2, city = $3, country = $4, zip = $5
         WHERE email = $6;`,
        [street, housenumber, city, country, zip, email]
      );
      await pool.query("COMMIT");
    }
    res.status(200).json({ status: "success", message: "User updated" });
  } catch (error) {
    await pool.query("ROLLBACK");
    next(error);
  }
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return res
      .status(401)
      .json({ status: "error", message: "no passwords sent" });
  try {
    const foundUser = await pool.query(
      "SELECT email, password FROM users WHERE email = $1;",
      [email]
    );
    if (!foundUser) {
      return res
        .status(401)
        .json({ status: "error", message: "Email not found." });
    }
    //check oldPassword
    const match = await bcrypt.compare(oldPassword, foundUser.rows[0].password);
    if (!match)
      return res
        .status(401)
        .json({ status: "error ", message: "Old password incorrect." });
    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = $1 WHERE email = $2;", [
      hash,
      email,
    ]);
    res
      .status(200)
      .json({ status: "success", message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
});

export const getBookings = asyncHandler(async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query(
      `SELECT b.id, title, quantity,b.price,(b.price*b.quantity)as sum,a.startdate
    FROM bookings AS b
    JOIN users AS u ON u.id = b.users_id
    JOIN activities AS a ON a.id = b.activities_id
    WHERE email = $1 AND startdate > NOW()
    ORDER BY startdate ASC;`,
      [email]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Booking not found" });
  }
});
