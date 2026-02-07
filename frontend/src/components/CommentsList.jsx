import React from "react";
import { useFetch } from "../hooks/UseFetch";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const CommentsList = ({ props }) => {
  const user = useSelector((state) => state.user);
  const { data: commentsData } = useFetch(
    `${import.meta.env.VITE_API_URL}/comment/get-comments/${props.blogid}`,
    { withCredentials: true },
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Comments
        <span className="text-gray-500 text-lg">
          (
          {props.newComments
            ? commentsData?.comments?.length + 1
            : commentsData?.comments?.length}
          )
        </span>
      </h1>

      {/* Comments */}
      <div className="space-y-6">
        {/* New comment (optimistic render) */}
        {props.newComments && (
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3 border border-blue-100 hover:shadow-lg transition">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={user?.user.avatar}
                  alt="user avatar"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <p className="font-semibold text-gray-900">
                  {user?.user.fullName || "Anonymous"}
                </p>
              </div>
              <p className="text-xs text-gray-500">
                {dayjs(props.newComments.createdAt).format("DD MMM YYYY") ||
                  "Just now"}
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed wrap-break-word">
              {props.newComments.comment}
            </p>
          </div>
        )}

        {/* API comments */}
        {commentsData?.comments?.map((comment, index) => (
          <div
            key={index}
            className="bg-white shadow-sm rounded-lg p-4 flex flex-col gap-3 border border-gray-100 hover:shadow-md transition">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center gap-3">
                {/* <img
                  src={comment.author.avatar}
                  alt="user avatar"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                /> */}
                <p className="font-semibold text-gray-900">
                  {comment.author.fullName || "Anonymous"}
                </p>
              </div>
              <p className="text-xs text-gray-500">
                {dayjs(comment.createdAt).format("DD MMM YYYY") || "Just now"}
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed wrap-break-word">
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
