const express = require("express");
const auth = require("./../middlewares/auth");
const postsController = require("../controllers/postsController");
const router = express.Router();

// POST /posts
router.post("/", auth,postsController.createPost);

// GET /posts
router.get("/", postsController.getPosts);

// GET /posts/:id
router.get("/:id", postsController.getPost);

// PUT /posts/:id
router.put("/:id", postsController.updatePost);

// DELETE /posts/:id
router.delete("/:id", postsController.deletePost);

module.exports = router;