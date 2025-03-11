const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;