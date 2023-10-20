// register user
export const registerUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).send({ status: "(User already exists" });
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    password: hash,
  });
  const token = jwt.sign({ uid: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
  res.status(201).send({ status: "success" });
});

// logout user
export const logoutUser = async (req, res, next) => {
  return res
    .clearCookie("accessToken")
    .status(200)
    .json({ message: "Successfully logged out" });
};

// login user
export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  const foundUser = await User.findOne({ username }).select("+password");
  if (!foundUser) return res.status(404).send({ status: "User not found" });
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 1800000 }); // 30min
    res.status(200).send({ status: "success" });
  }
});

// TODO: auth user
