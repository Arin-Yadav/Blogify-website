import { Link } from "react-router-dom";
import { useFetch } from "../hooks/UseFetch.js";
import LoadingSpinner from "../components/Loading.jsx";
import { deleteData } from "../helpers/DeleteData.js";
import { showToast } from "../helpers/ShowToast.js";
import { useState } from "react";
import dayjs from "dayjs";

const Users = () => {
  const [freshdata, setFreshdata] = useState(false);

  const { data, loading, _error } = useFetch(
    `${import.meta.env.VITE_SERVER_URL}/user/get-all-users`,
    { withCredentials: true },
    [freshdata],
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${import.meta.env.VITE_SERVER_URL}/user/delete/${id}`,
    );
    if (response) {
      setFreshdata(!freshdata);
      showToast("success", "User deleted");
    } else {
      showToast("error", "User not deleted");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-screen p-5">
      {/* Category tables */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200 mt-5">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Role
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Avatar
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Dated
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data && data.users.length > 0 ? (
              data?.users?.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {user.role}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {user.fullName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    <img src={user.avatar} alt="user-avatar" className="w-10 rounded-full object-contain" />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {dayjs(user.createAt).format("DD-MM-YYYY")}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <p>No data found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
