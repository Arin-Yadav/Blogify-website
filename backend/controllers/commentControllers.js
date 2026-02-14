import { handleError } from "../helpers/handleError.js";
import Comment from "../models/comment.js";

async function createComment(req, res, next) {
  try {
    const { comment, blogId } = req.body;
    const author = req.user._id; // comes from middleware

    if (!author || !comment || !blogId) {
      const err = new Error("Missing required fields");
      err.statusCode = 400;
      return next(err);
    }

    const newComment = await Comment.create({
      author,
      comment,
      blogid: blogId,
    });

    res.status(201).json({
      success: true,
      message: "Comment submitted.",
      comment: newComment,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getComments(req, res, next) {
  try {
    const { blogid } = req.params;
    const comments = await Comment.find({ blogid })
      .populate("author", "fullName")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      comments,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

// for admin
async function getAllComments(req, res, next) {
  try {
    const user = req.user;
    let comments;
    if (user.role === "admin") {
      comments = await Comment.find()
        .sort({ createdAt: -1 })
        .populate("blogid", "title")
        .populate("author", "fullName");
    } else {
      comments = await Comment.find({ author: user._id })
        .sort({ createdAt: -1 })
        .populate("blogid", "title")
        .populate("author", "fullName");
    }

    res.status(200).json({
      comments,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

async function deleteComment(req, res, next) {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "comment deleted successfully",
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

export { createComment, getComments, getAllComments, deleteComment };
