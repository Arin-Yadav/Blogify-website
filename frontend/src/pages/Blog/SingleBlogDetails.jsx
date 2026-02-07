import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Comments from "../../components/Comments";

const SingleBlogDetails = () => {
  const { id } = useParams();

  const blogs = {
    mongodb: {
      id: "mongodb",
      title: "How to Connect MongoDB Locally",
      date: "Feb 6, 2026",
      image:
        "https://images.unsplash.com/photo-1658204238967-3a81a063d162?w=800&auto=format&fit=crop&q=80",
      content: `Here is the full blog content about MongoDB setup...`,
    },
    "react-hooks": {
      id: "react-hooks",
      title: "Mastering React Hooks",
      date: "Jan 20, 2026",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhY3Rqc3xlbnwwfHwwfHx8MA%3D%3D",
      content: `Full blog content about React Hooks...`,
    },
    tailwind: {
      id: "tailwind",
      title: "Styling with Tailwind CSS",
      date: "Dec 15, 2025",
      image:
        "https://media.istockphoto.com/id/2235914888/photo/desktop-computer-shows-detailed-information-complete-and-processed-quickly.webp?a=1&b=1&s=612x612&w=0&k=20&c=qP6amguKbO9a7LJqr5f0rIvlejQTl7njcow-H3SCgOc=",
      content: `Full blog content about Tailwind CSS...`,
    },
  };

  const blog = blogs[id];
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  if (!blog) {
    return <p className="text-center mt-10 text-red-500">Blog not found.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments([
      ...comments,
      { text: newComment, date: new Date().toLocaleString() },
    ]);
    setNewComment("");
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-10 min-h-[calc(100vh-64px)]">
      <div className="max-w-3xl lg:max-w-5xl mx-auto">
        <Link
          to="/"
          className="mb-6 inline-block text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Blogs
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 sm:h-64 md:h-72 lg:h-96 object-cover"
          />
          <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {blog.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              Published on {blog.date}
            </p>
            <article className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 mb-8">
              {blog.content}
            </article>

            {/* Comment Section */}
            <Comments props={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogDetails;
