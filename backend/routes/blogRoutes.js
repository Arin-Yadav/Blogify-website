// backend/routes/blogs.js
import express from "express";
import multer from "multer";
import Blog from "../models/blog.js";

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create blog with optional image
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      imageUrl: req.file
        ? `/uploads/${req.file.filename}`
        : "https://via.placeholder.com/600x300?text=Blog+Image",
    });
    await blog.save();
    res.status(201).json({ message: "Blog created successfully!", blog });
  } catch (err) {
    res.status(500).json({ message: "Error creating blog", error: err.message });
  }
});

// routes/blogs.js
router.get("/getBlogs", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "fullName");
    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "fullName");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ blog });
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog" });
  }
});


// Get previous blog
router.get("/:id/prev", async (req, res) => {
  // const id = req.params.id
  const currentBlog = await Blog.findById(req.params.id);
  // console.log(`Prev: ${id}`)
  const prevBlog = await Blog.findOne({ createdAt: { $lt: currentBlog.createdAt } })
    .sort({ createdAt: -1 });
  res.json({ blog: prevBlog });
});

// Get next blog
router.get("/:id/next", async (req, res) => {
  const currentBlog = await Blog.findById(req.params.id);
  const nextBlog = await Blog.findOne({ createdAt: { $gt: currentBlog.createdAt } })
    .sort({ createdAt: 1 });
  res.json({ blog: nextBlog });
});


export default router;
