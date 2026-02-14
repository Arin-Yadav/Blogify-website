import { Link } from "react-router-dom";
import { RouteCreateBlog, RouteSingleBlogDetails } from "../helpers/RouteName";
import { useEffect, useState } from "react";
import axios from "axios";

const FeaturedPost = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/blogs/getBlogs`
        );
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 bg-gray-50">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-gray-900">
        Blogs
      </h1>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={RouteSingleBlogDetails(blog._id)}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                {/* Blog image */}
                <div className="relative">
                  <img
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    src={`${import.meta.env.VITE_SERVER_URL}${blog.imageUrl}`}
                    alt={blog.title}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Blog content */}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3">
                    Published on{" "}
                    {new Date(blog.createdAt).toLocaleDateString("en-IN")}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                    {blog.excerpt || blog.content}
                  </p>
                  <span className="text-blue-600 hover:text-blue-800 font-medium mt-auto">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white shadow-md rounded-lg p-8">
          <p className="text-xl font-semibold text-gray-700 mb-4">
            No blogs available yet.
          </p>
          <Link
            to={RouteCreateBlog}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Now
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeaturedPost;
