import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter blog title"],
    minLength: [4, "Title must be at least 4 characters"],
    maxLength: [80, "Title can't be exceed 80 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter  blog desc"],
    minLength: [10, "Title must be at least 20 characters"],
  },

  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  
  views: {
    type: Number,
    default: 0,
  },

  category: {
    type: String,
    required: true,
  },

  createdBy: {
    type: String,
    required: [true, "Enter blog Creator name"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
