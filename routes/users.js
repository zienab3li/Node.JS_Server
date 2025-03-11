const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

// GET /users -> get all users
router.get("/", usersController.getUsers);
// POST /users -> create a new user
router.post("/", usersController.createUser);
// GET /users/:id -> get a user by id
router.get("/:id", usersController.getUserById);
// PUT /users/:id -> update a user by id
router.put("/:id", usersController.updateUserById);
// DELETE /users/:id -> delete a user by id
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
