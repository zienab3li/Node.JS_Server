const APIError = require("../util/APIError");
const User = require("../models/users");

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await User.create({ ...data, role: "user" });
    res.status(201).json({ status: "success", data: { user } });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({ role: "user" });
  if (!users) {
    throw new APIError("No users found", 404);
  }
  res
    .status(200)
    .json({ status: "success", data: { length: users.length, users } });
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).populate("posts");
  if (!user) {
    throw new APIError(`user with id: ${userId} is not found`, 404);
  }
  res.status(200).json({ status: "success", data: { user } });
};

const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { name: userData.name, email: userData.email },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    throw new APIError(`user with id: ${userId} is not found`, 404);
  }

  res.status(200).json({ status: "success", data: { user: updatedUser } });
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new APIError(`user with id: ${userId} is not found`, 404);
  }
  res.status(204).json();
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
