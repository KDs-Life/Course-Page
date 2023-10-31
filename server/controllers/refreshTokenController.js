import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../services/db.js";

export const refreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  try {
    const foundUser = await pool.query(
      "SELECT * FROM users WHERE refreshToken = $1;",
      [refreshToken]
    );
    if (foundUser.rowCount !== 1) return res.sendStatus(403);

    return res
      .status(200)
      .json({ status: "success", message: "Logout successful" });
  } catch (err) {}
};
