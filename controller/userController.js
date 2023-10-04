const user = require("../models/userModel");
const { secure } = require("../bcrypt/bcrypt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return next(new AppError("Please enter all fields!", 400));
  }
  const existingUser = await user.findOne({ email: email });
  if (existingUser) {
    return next(new AppError("Email already exists!", 409));
  }
  const payload = { name, email, password: await secure(password) };
  if (req.file) {
    payload.profilePic = `${req.file.destination}/${req.file.filename}`;
  }
  let newUser = await user.create(payload);
  res.status(201).json({
    status: "success",
    details: newUser,
    msg: "Account created successfully",
  });
});

const googleLogin = catchAsync(async (req, res, next) => {
  const { googleId, name, email } = req.body;

  try {
    // Check if user with the Google ID exists
    let existingUser = await user.findOne({ googleId: googleId });

    if (!existingUser) {
      // Create a new user with Google ID
      const newUser = await user.create({
        name,
        email,
        googleId,
      });

      return res.status(201).json({
        status: "success",
        details: newUser,
        msg: "Account created successfully",
      });
    }

    // User with Google ID already exists, proceed with login logic
    const token = generateJwtToken(existingUser);

    res.status(200).json({
      status: "success",
      token,
      role: existingUser.role,
      name: existingUser.name,
      msg: "Logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred",
    });
  }
});

// Function to generate JWT token
const generateJwtToken = (user) => {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = "1h";

  return jwt.sign({ id: user._id }, secretKey, { expiresIn });
};

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please enter all fields!", 400));
  }

  const checkEmail = await user.findOne({ email: req.body.email });
  if (!checkEmail) {
    return next(new AppError("Invalid Email or Password", 400));
  }
  const isMatch = await bcrypt.compare(password, checkEmail.password);
  if (!isMatch) {
    return next(new AppError("Invalid Email or Password", 400));
  }
  checkEmail.password = undefined;
  const token = jwt.sign({ id: checkEmail._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({
    status: "success",
    token,
    userDetails: checkEmail,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userDetails = await user.findById(id).select("-__v -password");
  if (!userDetails) {
    return next(new AppError("something-went-wrong", 400));
  }
  res.status(200).json({
    success: true,
    userDetails: userDetails,
  });
});

const deleteUserById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userDetails = await user.findByIdAndDelete(id);
  if (!userDetails) {
    return next(new AppError("something-went-wrong", 400));
  }
  res.status(200).json({
    success: true,
    message: " User deleted successfully",
  });
});

const userUpdateHisProfile = catchAsync(async (req, res, next) => {
  const id = req.user;
  const { name, email } = req.body;
  const payload = {
    name,
    email,
  };
  if (req.file) {
    const img = `${req.file.destination}/${req.file.filename}`;
    payload.pic = img;
  }
  const updatedUser = await user.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (updatedUser != null) {
    const update = await updatedUser.save();
    res.status(200).json({
      message: "updated successfull",
      updatedData: update,
    });
  }
});

module.exports = {
  registerUser,
  googleLogin,
  loginUser,
  getUserById,
  deleteUserById,
  userUpdateHisProfile,
};
