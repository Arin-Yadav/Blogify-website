import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../helpers/handleError.js";

async function handleSignUp(req, res, next) {
  try {
    const { fullName, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return next(handleError(409, "User already registered"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User created successfully",
      success: "true",
    });
  } catch (err) {
    next(handleError(500, err.message || "Signup failed"));
  }
}

async function handleSignout(req, res) {
  try {
    res.clearCookie("access-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });
    res.status(200).json({ message: "User logged out" });
  } catch (err) {
    res.status(400).json({ error: "Signout failed" });
  }
}

async function handleSignIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return next(handleError(404, "Invalid login credentials"));

    const hashedPassword = user.password;
    const matchUser = await bcrypt.compare(password, hashedPassword);
    if (!matchUser)
      return next(handleError(404, "Invalid login credentials"));

    const token = jwt.sign(
      {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );
    res.cookie("access-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: newUser,
    });
  } catch (err) {
    next(handleError(500, err.message || "Signin failed"));
  }
}

export { handleSignUp, handleSignIn, handleSignout };
