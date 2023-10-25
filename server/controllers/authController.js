import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//TODO: express-valdiator for checking data?

// register user
export const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .send({ status: "error", message: "Email is already registered" });
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hash,
  });
  const token = jwt.sign(
    { uid: newUser._id, username: newUser.email },
    process.env.ACCESS_TOKEN_SECRET
  );
  res
    .status(201)
    .send({ token, status: "success", message: "Register user successful" });
});

// logout user
export const logoutUser = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content
  res.clearCookie("jwt", { httpOnly: true });
  res.json({ status: "success", message: "Logout successful" });
};

// login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "Email and password are required." });
  }
  const foundUser = await User.findOne({ email }).select("+password");
  if (!foundUser) {
    return res.status(401).json({ message: "Email not found." });
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: process.env.REFRESH_COOKIE_EXPIRE,
    });
    res.json({ accessToken });
  }
});

// TODO: auth user route for verifying requests
export const refreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      const foundUser = await User.findOne({ email: decoded.email }).exec();
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            role: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
      );
      res.json({ accessToken });
    }
  );
};
