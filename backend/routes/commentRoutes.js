import express from "express";
import { createComment, deleteComment, getAllComments, getComments } from "../controllers/commentControllers.js";
import { checkForAuthentication } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/create", checkForAuthentication, createComment)
router.get("/get-comments/:blogid", getComments)
router.get("/get-all-comments", checkForAuthentication, getAllComments) // admin
router.delete("/delete/:id", checkForAuthentication, deleteComment)

export default router;
