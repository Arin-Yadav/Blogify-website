import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

async function getUser(req, res, next) {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    if (!user) {
      return next(handleError(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    return next(handleError(500, error.message || "Internal Server Error"));
  }
}

async function updateUser(req, res, next) {
  try {
    const data = JSON.parse(req.body.data);
    const { userid } = req.params; // be careful while receiving the userid because if mismatch from the route it will undefined (see in the userRoutes url /:userid so use userid only and not userId)

    const user = await User.findById(userid);
    user.fullName = data.fullName;
    user.email = data.email;
    user.bio = data.bio;

    if (data.password && data.password.length >= 8) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      user.password = hashedPassword;
    }

    if (req.file) {
      try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "blog-website",
          resource_type: "auto",
        });

        user.avatar = uploadResult.secure_url;
      } catch (error) {
        return next(handleError(500, error.message || "Internal Server Error"));
      }
    }

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      user: newUser,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal Server Error"));
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      users,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

async function deleteUser(req, res, next) {
  try {
    const { userid } = req.params;
    const user = await User.findByIdAndDelete(userid);
    if (!user) {
      return next(handleError(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(handleError(500, error.message || "Internal Server Error"));
  }
}

export { getUser, updateUser, deleteUser, getAllUsers };
