import React from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const CommentsList = ({ comments }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 border-b pb-3 mb-6">
        Comments{" "}
        <span className="text-gray-500 ml-1 text-lg">({comments?.length})</span>
      </h2>

      {/* Comments */}
      <div className="space-y-6">
        {comments?.map((c) => {
          const isOwnComment = c.author?._id === user?.user?._id;

          return (
            <div
              key={c._id}
              className="w-full bg-white rounded-lg shadow p-4 sm:p-6"
            >
              {/* Header row: avatar + username + date */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      isOwnComment
                        ? "bg-blue-200 text-blue-700"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {c.author?.fullName?.charAt(0).toUpperCase()}
                  </div>
                  {/* Username */}
                  <p className="font-medium text-gray-900">
                    {c.author?.fullName || "Anonymous"}
                  </p>
                </div>

                {/* Date & Time */}
                <span className="text-xs text-gray-500">
                  {dayjs(c.createdAt).format("DD MMM YYYY, hh:mm A")}
                </span>
              </div>

              {/* Comment text */}
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {c.comment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentsList;
