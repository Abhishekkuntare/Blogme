import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
} from "../controllers/blogController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/blogs").get(getAllBlogs);

router
  .route("/createblog")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createBlog);

router.route("/blog/:id").delete(isAuthenticated, authorizeAdmin, deleteBlog);
router.route("/blog/:id").get(authorizeAdmin, getSingleBlog);

export default router;
