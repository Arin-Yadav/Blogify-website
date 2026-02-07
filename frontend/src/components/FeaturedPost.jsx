import { Link } from "react-router-dom";
import { RouteSingleBlogDetails } from "../helpers/RouteName";

const FeaturedPost = () => {
  const blogs = [
    {
      id: "mongodb",
      title: "How to Connect MongoDB Locally",
      date: "Feb 6, 2026",
      image:
        "https://images.unsplash.com/photo-1658204238967-3a81a063d162?w=500&auto=format&fit=crop&q=60",
      excerpt:
        "Learn how to set up and connect MongoDB on your local machine using Compass and Node.js.",
    },
    {
      id: "react-hooks",
      title: "Mastering React Hooks",
      date: "Jan 20, 2026",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhY3Rqc3xlbnwwfHwwfHx8MA%3D%3D",
      excerpt:
        "A beginner‑friendly guide to useState, useEffect, and custom hooks for building modern React apps.",
    },
    {
      id: "tailwind",
      title: "Styling with Tailwind CSS",
      date: "Dec 15, 2025",
      image:
        "https://media.istockphoto.com/id/2235914888/photo/desktop-computer-shows-detailed-information-complete-and-processed-quickly.webp?a=1&b=1&s=612x612&w=0&k=20&c=qP6amguKbO9a7LJqr5f0rIvlejQTl7njcow-H3SCgOc=",
      excerpt:
        "Learn how to build responsive, modern UIs quickly using Tailwind’s utility‑first approach. Tailwind uses utility classes.",
    },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
        Blogs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            to={RouteSingleBlogDetails(blog.id)}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
              <img
                className="w-full h-40 sm:h-48 md:h-56 object-cover"
                src={blog.image}
                alt={blog.title}
              />
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-3">
                  Published on {blog.date}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                  {blog.excerpt}
                </p>
                <span className="text-blue-600 hover:text-blue-800 font-medium mt-auto">
                  Read More →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPost;
