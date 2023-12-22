import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Blog } from "../models/Blog.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

export const getAllBlogs = catchAsyncError(async (req, res) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";
  const blogs = await Blog.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  });
  res.status(200).json({
    success: true,
    blogs,
  });
});

export const createBlog = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("please add all fields ", 400));

  const file = req.file;
  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Blog.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: mycloud.public_id,
      url: mycloud.url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Blog created successfully. ",
  });
});

export const deleteBlog = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (!blog) return next(new ErrorHandler("Blog not Found !", 404));

  await cloudinary.v2.uploader.destroy(blog.poster.public_id);

  await blog.deleteOne({id})

  res.status(200).json({
    status: true,
    message: "Blog Deleted successfully",
  });
});

