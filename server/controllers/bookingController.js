import asyncHandler from "../utils/asyncHandler.js";
import pool from "../services/db.js";

/*
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();

    if (!bookings.length) {
      throw { statusCode: 404, message: "Booking not found" };
    }
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};
*/

/*
export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookings = await Booking.find({ _id: id });

    if (!bookings) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const createBooking = asyncHandler(async (req, res, next) => {
  const { user, activity, quantity, price } = req.body;
  const newBooking = await Booking.create({
    user,
    activity,
    quantity,
    price,
  });
  res.json(newBooking);
});
*/

/* Create booking as Admin 

  export const createBooking = asyncHandler(async (req, res, next) => {

    const { userId, activityId, quantity, price } = req.body;

    const activity = await Activity.findById(activityId);

    const user = await User.findById(userId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const newBooking = await Post.create({ userId, activityId, quantity, price });
    
    res.json(newBooking);
  });
  */
/*
export const checkSlotBookings = async (req, res, next) => {
  try {
    const agg = [
      {
        $unwind: "$bookings",
      },
      {
        $group: {
          _id: "$bookings.activity",
          quantity: {
            $sum: "$bookings.quantity",
          },
        },
      },
    ];
    const checkSlots = await User.aggregate(agg);
    if (!checkSlots.length) {
      return res
        .status(404)
        .json({ message: "no booked activities not found" });
    }
    res.json(checkSlots);
  } catch (error) {
    next(error);
  }
};

export const checkSlotBookingsById = async (req, res, next) => {
  try {
    const agg = [
      {
        $unwind: "$bookings",
      },
      {
        $group: {
          _id: "$bookings.activity",
          quantity: {
            $sum: "$bookings.quantity",
          },
        },
      },
      {
        $match: {
          _id: req.params.id,
        },
      },
    ];
    const checkSlots = await User.aggregate(agg);
    if (!checkSlots.length) {
      return res.status(404).json({ message: "Actitivy not found" });
    }
    res.json(checkSlots);
  } catch (error) {
    next(error);
  }
};

export const checkBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("user activity").exec();
    if (!bookings.length) {
      return res
        .status(404)
        .json({ status: "error", message: "Nothing not found" });
    }
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};
*/


// Start SQL functions:

export const getBookingsSQL = asyncHandler(async (req, res) => {
  try {
  const result = await pool.query("SELECT * FROM bookings;");
  return res.status(200).json(result.rows);
  }
  catch (error) {
    res.status(500).json({ message: "Booking not found" });
  }
});

export const getBookingsByIDSQL = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM bookings WHERE id = $1;", [id]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Booking not found" });
  }
});


// export const createBookingSQL = asyncHandler(async (req, res) => {
//   const { userId, activityId, quantity, price } = req.body;

//   const userResult = await pool.query("SELECT * FROM users WHERE id = $1;", [userId]);
//   const activityResult = await pool.query("SELECT * FROM activities WHERE id = $1;", [activityId]);

//   if (userResult.rows.length === 0 || activityResult.rows.length === 0) {
//     return res.status(404).json({ message: "User or Activity not found" });
//   }
//   //return res.json(activityResult.rows[0])
  
//   const result = await pool.query(
//     "INSERT INTO bookings (users_id, activities_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *;",
//     [userId, activityId, quantity, price]
//   );
  

//   res.status(201).json(result.rows[0]);
// });


export const createBookingSQL = asyncHandler(async (req, res) => {
  const { userId, activityId, quantity, price } = req.body;

  const userResult = await pool.query("SELECT * FROM users WHERE id = $1;", [userId]);
  const activityResult = await pool.query("SELECT * FROM activities WHERE id = $1;", [activityId]);

  if (userResult.rows.length === 0 || activityResult.rows.length === 0) {
    return res.status(404).json({ message: "User or Activity not found" });
  }

  const totalQuantityResult = await pool.query(
    "SELECT b.activities_id, SUM(b.quantity) AS total_quantity, a.maxslots FROM bookings AS b JOIN activities AS a ON b.activities_id = a.id WHERE b.activities_id = $1 GROUP BY b.activities_id, a.maxslots ORDER BY b.activities_id ASC;",
    [activityId]
  );

  if (totalQuantityResult.rows[0].total_quantity >= totalQuantityResult.rows[0].maxslots) {
    return res.status(400).json({ message: "Activity is fully booked" });
  }

  const result = await pool.query(
    "INSERT INTO bookings (users_id, activities_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *;",
    [userId, activityId, quantity, price]
  );

  res.status(201).json(result.rows[0]);
});