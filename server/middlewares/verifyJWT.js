import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw new ErrorResponse("Please login", 401);

  const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
  req.email = decoded.email;
  next();
});

export default verifyToken;
