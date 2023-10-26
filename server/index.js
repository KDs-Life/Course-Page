import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { requireAuth, checkUser } from "./middlewares/authMiddleware.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import activityRouter from "./routes/activityRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import "./db/server.js";
import "./services/db.js";

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST;

const app = express();

app.use(
  cors({ origin: `${process.env.FRONTEND_CONNECTION}`, credentials: true })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
//app.use("*", checkUser);
app.use("/", authRouter);
app.use("/user", requireAuth, userRouter);
app.use("/activities", activityRouter);
app.use("/bookings", bookingRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
