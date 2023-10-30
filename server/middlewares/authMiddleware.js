import User from "../models/User.js";
import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        if (err.message === "jwt expired") console.error(err.message); // TODO: if "jwt expired" -> try refresh
        res.status(401).json("401 Unauthorized");
      } else {
        next();
      }
    });
  } else {
    res.status(401).json("401 Unauthorized");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.error(err.message);
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.email);
          res.locals.user = user.email;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

export { requireAuth, checkUser };
