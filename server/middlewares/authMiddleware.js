import User from "../models/User.js";
import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.error(err.message);
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
          let user = await User.findById(decodedToken.id);
          res.locals.user = user._id;
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
