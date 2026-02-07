import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userControllers.js";
import { upload } from "../config/multer.js";
import { checkForAuthentication } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(checkForAuthentication) // if this middlware is added like this then carefully cuz when adding new routes will go through this which can cause error in some case where this is not needed.
router.get("/get-user/:userid", getUser);
router.put("/update-user/:userid", upload.single("file"), updateUser);
router.get("/get-all-users", getAllUsers);
router.delete("/delete/:userid", deleteUser);

export default router;
