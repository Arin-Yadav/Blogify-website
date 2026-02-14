import { useForm } from "react-hook-form";
import axios from "axios";
import { showToast } from "../helpers/ShowToast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RouteIndex } from "../helpers/RouteName";

const CreateBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userId = user?.user._id;

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("author", userId);

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/blogs/create`,
        formData,
        { withCredentials: true }
      );

      showToast("success", res.data.message);
      reset();
      navigate(RouteIndex);
    } catch (err) {
      showToast("error", err.response?.data?.message || "Error creating blog");
    }
  };

  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8 space-y-6"
        encType="multipart/form-data"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create a Blog
          </h2>
          <Link
            to={RouteIndex}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Home
          </Link>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Enter blog title"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            rows="8"
            placeholder="Write your blog..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            {...register("image")}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-600
                       hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Publish Blog
        </button>
      </form>
    </section>
  );
};

export default CreateBlog;
