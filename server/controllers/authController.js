import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../services/db.js";

const JWT_OPTIONS_ACCESS = {
  algorithm: process.env.JWT_ALGORITHM,
  expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
};

const JWT_OPTIONS_REFRESH = {
  algorithm: process.env.JWT_ALGORITHM,
  expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
};

// register user
export const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1;",
      [email]
    );
    if (existingUser.rowCount !== 0) {
      return res
        .status(409)
        .send({ status: "error", message: "Email is already registered" });
    }
    const hash = await bcrypt.hash(password, 10);
    let created = new Date();
    const newUser = await pool.query(
      "INSERT INTO users (email, password,created) VALUES ($1, $2, $3) RETURNING id;",
      [email, hash, created]
    );
    const token = jwt.sign(
      { uid: newUser.rows[0].id, username: email },
      process.env.ACCESS_TOKEN_SECRET
    );
    res
      .status(201)
      .send({ token, status: "success", message: "Register user successful" });
  } catch (error) {
    next(error);
  }
});

// logout user
export const logoutUser = async (req, res, next) => {
  const cookies = req.cookies;
  for (let prop in cookies) {
    res.clearCookie(prop); //Or res.cookie(prop, '', {expires: new Date(0)});
  }
  return res
    .status(200)
    .json({ status: "success", message: "Logout successful" });
};

// login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "Email and password are required." });
  }
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
    const match = await bcrypt.compare(password, foundUser.rows[0].password);
    if (!match)
      return res
        .status(401)
        .json({ status: "error ", message: "Wrong credentials." });

    const accessToken = jwt.sign(
      {
        email: foundUser.rows[0].email,
        roles: foundUser.rows[0].role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );
    const refreshToken = jwt.sign(
      {
        email: foundUser.rows[0].email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );
    const saveRefreshToken = await pool.query(
      "UPDATE users SET refresh_token = $1 WHERE email = $2;",
      [refreshToken, email]
    );
    //TODO: cookie settings in ENV for production?!
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      //secure: true,
      //sameSite: "None",
      maxAge: process.env.REFRESH_COOKIE_EXPIRE,
    });
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    //next(error);
  }
});

//TODO: autoLogin => when user reloads page but got a valid cookie (security issue?)
export const autoLogin = asyncHandler(async (req, res) => {
  const cookie = req.headers.cookie;

  if (!cookie || cookie === null) {
    return res.sendStatus(401);
  }

  return res.sendStatus(200);
});
