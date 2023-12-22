import express from "express";
import {
  changePassword,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/changepassword").put(isAuthenticated, changePassword);

router.route("/updateprofile").put(isAuthenticated, updateProfile);

router
  .route("/updateprofilepicture")
  .put(singleUpload, isAuthenticated, updateProfilePicture);

router.route("/forgetpassword").post(forgotPassword);

router.route("/resetpassword/:token").put(resetPassword);

router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/admin/users/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
