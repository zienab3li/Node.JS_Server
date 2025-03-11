const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

// POST /posts
router.post("/", postsController.createPost);

// GET /posts
router.get("/", postsController.getPosts);

// GET /posts/:id
router.get("/:id", postsController.getPost);

// PUT /posts/:id
router.put("/:id", postsController.updatePost);

// DELETE /posts/:id
router.delete("/:id", postsController.deletePost);

module.exports = router;