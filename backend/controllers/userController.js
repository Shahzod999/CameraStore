import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bycript from "bcryptjs";
import createToken from "../utils/createToken.js";
import validateEmail from "../utils/validateEmail.js";

const createUser = asyncHandler(async (req, res) => {
  const { email, password, userName } = req.body;

  if (!validateEmail(email)) {
    throw new Error("Email incorrect");
  }

  if (!email || !password || !userName) {
    throw new Error("Please fill all fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new Error("User already exists");
  }

  try {
    const salt = await bycript.genSalt(10);
    const hashedPassword = await bycript.hash(password, salt);
    const newUser = new User({ userName, email, password: hashedPassword });

    await newUser.save();
    createToken(res, newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error, try again" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Password and Email required");
  }
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new Error("User not registered");
  }

  const isPasswordValid = await bycript.compare(password, existingUser.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password or Email");
  }

  createToken(res, existingUser._id);
  res.status(201).json({
    _id: existingUser._id,
    email: existingUser.email,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out Successfully" });
});

export { createUser, loginUser, logoutUser };
