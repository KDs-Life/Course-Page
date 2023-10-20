import asyncHandler from "../utils/asyncHandler.js";

// register user
export const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).send({ status: "(Email is already registered" });
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
  return res
    .clearCookie("accessToken")
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
  if (!foundUser)
    return res
      .status(404)
      .send({ status: "error", message: "Email not found." });
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 1800000 }); // 30min
    res.status(200).send({ status: "success", message: "Login successful." });
  }
});

// TODO: auth user route for verifying requests
