import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Comments from "../../components/Comments";

const SingleBlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [prevBlog, setPrevBlog] = useState(null);
  const [nextBlog, setNextBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log(prevBlog?._id)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/blogs/${id}`,
        );
        setBlog(res.data.blog);

        // Fetch prev/next
        const prevRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/blogs/${id}/prev`,
        );
        // console.log(prevRes.data.blog._id);
        const nextRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/blogs/${id}/next`,
        );
        // console.log(nextRes.data.blog._id);
        setPrevBlog(prevRes.data.blog);
        setNextBlog(nextRes.data.blog);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog)
    return <p className="text-center mt-10 text-red-500">Blog not found.</p>;

  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 bg-gray-50 min-h-screen">
      <div className="max-w-3xl lg:max-w-5xl mx-auto">
        <Link
          to="/"
          className="mb-6 inline-block text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Blogs
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={
              blog.imageUrl?.startsWith("http")
                ? blog.imageUrl
                : `${import.meta.env.VITE_SERVER_URL}${blog.imageUrl}`
            }
            alt={blog.title}
            className="w-full h-56 sm:h-72 md:h-96 object-cover"
          />

          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mb-6">
              Published on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-IN")} by{" "}
              {blog.author?.fullName || "Anonymous"}
            </p>
            <article className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 mb-10">
              {blog.content}
            </article>

            {/* Navigation */}
            <div className="flex justify-between border-t pt-6">
              {prevBlog ? (
                <Link
                  to={`/blog/singledetails/${prevBlog?._id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium">
                  ← {prevBlog.title}
                </Link>
              ) : (
                <span className="text-gray-400">No previous blog</span>
              )}

              {nextBlog ? (
                <Link
                  to={`/blog/singledetails/${nextBlog?._id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium">
                  {nextBlog.title} →
                </Link>
              ) : (
                <span className="text-gray-400">No next blog</span>
              )}
            </div>

            {/* Comments */}
            <div className="border-t pt-6 mt-6">
              <Comments props={id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBlogDetails;
