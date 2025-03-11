const Post = require("../models/posts");
const APIError = require("../util/APIError");

// Create a new post
const createPost = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;
    const post = await Post.create({ title, content, userId });
    res.status(201).json({ status: "success", data: { post } });
  } catch (error) {
    next(error);
  }
};

// Get all posts
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("userId", "name email"); // Populate user details
    res.status(200).json({ status: "success", data: { posts } });
  } catch (error) {
    next(error);
  }
};

// Get a single post by ID
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("userId", "name email");

    if (!post) {
      throw new APIError(`Post with id: ${postId} not found`, 404);
    }

    res.status(200).json({ status: "success", data: { post } });
  } catch (error) {
    next(error);
  }
};

// Update a post by ID
const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true, runValidators: true } // Return the updated document and run validators
    ).populate("userId", "name email");

    if (!updatedPost) {
      throw new APIError(`Post with id: ${postId} not found`, 404);
    }

    res.status(200).json({ status: "success", data: { post: updatedPost } });
  } catch (error) {
    next(error);
  }
};

// Delete a post by ID
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      throw new APIError(`Post with id: ${postId} not found`, 404);
    }

    res.status(204).json(); // No content to send back
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};