import { useForm } from "react-hook-form";
import { showToast } from "../helpers/ShowToast";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import CommentsList from "./CommentsList";

const Comments = ({ props: blogId }) => {
  const user = useSelector((state) => state.user);
  const [newComments, setNewComments] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values) => {
    if (!user?.isLoggedIn) {
      // 🚫 Block submission and show message
      showToast("error", "Please sign in to comment.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/comment/create`,
        { ...values, blogId },
        { withCredentials: true },
      );
      // console.log(response.data.comment);
      setNewComments(response.data.comment);
      reset({ comment: "" }); // clear only the comment field
      showToast("success", response.data.message);
    } catch (error) {
      console.log(error);
      showToast(
        "error",
        error.response?.data?.message ||
          "Error saving changes. Please try again.",
      );
    }
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <textarea
            {...register("comment", { required: "Comment cannot be empty" })}
            className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:ring focus:ring-blue-300 focus:outline-none"
            rows="4"
            placeholder="Write your comment..."
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Submit
        </button>
      </form>

      {/* Comment List */}
      <div className="mt-6">
        <CommentsList props={{ newComments }} />
      </div>
    </div>
  );
};

export default Comments;
