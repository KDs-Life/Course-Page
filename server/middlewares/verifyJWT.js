import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        switch (err.message) {
          case "jwt expired":
            res.status(401).json("401 Unauthorized: JWT expired");
            break;
          case "invalid signature":
            res.status(401).json("401 Unauthorized: invalid signature");
            break;
          default:
            res.status(401).json(`401 Unauthorized...`);
        }
      } else {
        // const differ = Date.now() - decodedToken.exp;
        // console.error("jwt: ", differ);
        next();
      }
    });
  } else {
    res.status(401).json("AUTH: 401 Unauthorized");
  }
});

export default verifyToken;
