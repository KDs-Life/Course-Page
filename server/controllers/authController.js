import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_OPTIONS_ACCESS = {
  algorithm: process.env.JWT_ALGORITHM,
  expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
};

const JWT_OPTIONS_REFRESH = {
  algorithm: process.env.JWT_ALGORITHM,
  expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
};

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

  //   const token = jwt.sign(
  //     { uid: newUser._id, username: newUser.username },
  //     process.env.JWT_SECRET
  //   );
  //   res.status(201).send({ token, newUser });
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
  const foundUser = await User.findOne({ email }).select("+password");
  if (!foundUser) {
    return res.status(401).json({ message: "Email not found." });
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        email: foundUser.email,
        roles: foundUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
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
      //secure: true,
      //sameSite: "None",
      maxAge: process.env.REFRESH_COOKIE_EXPIRE,
    });
    res.json({ accessToken });
    //res.status(200).send({ status: "success", message: "Login successful." });
  }
});

// TODO: auth user route for verifying requests
