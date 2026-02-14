import { showToast } from "../helpers/ShowToast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/user.slice";
import { useFetch } from "../hooks/UseFetch.js";
import LoadingSpinner from "../components/Loading";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { IoCameraOutline } from "react-icons/io5";

const Profile = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.user);
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    data: userData,
    loading,
    error: _error,
    // error,
  } = useFetch(
    `${import.meta.env.VITE_SERVER_URL}/user/get-user/${userDetails._id}`,
    { withCredentials: true },
  );

  useEffect(() => {
    if (userData && userData.success) {
      reset({
        fullName: userData.user.fullName,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData, reset]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(values));

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/user/update-user/${userData.user._id}`,
        formData,
        {
          withCredentials: true,
        },
      );
      dispatch(setUser(response.data.user));
      showToast("success", response.data.message);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message ||
          "Error saving changes. Please try again.",
      );
    }
  };

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 space-y-8">
        {/* Top section: Avatar + Upload */}
        <div className="flex flex-col justify-center sm:flex-row sm:items-center sm:space-x-8 space-y-6 sm:space-y-0">
          <Dropzone
            onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section className="flex justify-center sm:justify-start w-full sm:w-auto">
                <div {...getRootProps()} className="relative cursor-pointer">
                  <input {...getInputProps()} />
                  <img
                    src={filePreview ? filePreview : userData?.user?.avatar}
                    alt="Avatar"
                    className="w-32 h-32 sm:w-44 sm:h-44 rounded-full border-2 border-gray-300 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full shadow-md">
                    <IoCameraOutline className="w-5 h-5" />
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col col-span-1">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col col-span-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Bio (spans full width) */}
          <div className="flex flex-col col-span-1 sm:col-span-2">
            <label htmlFor="bio" className="text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              placeholder="Enter your bio here..."
              rows={4}
              className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("bio", { required: "Bio is required" })}
            />
            {errors.bio && (
              <p className="text-xs text-red-500 mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Submit Button (spans full width) */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
