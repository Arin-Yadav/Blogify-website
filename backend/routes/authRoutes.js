import express from "express";
import {
  handleSignUp,
  handleSignIn,
  handleSignout,
} from "../controllers/authControllers.js";
import { checkForAuthentication } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
router.get("/signout", handleSignout);

export default router;
