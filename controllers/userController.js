const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//Get all users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({admin_id: req.admin.id});
  res.status(200).json(users);
});

//Create user
const createUser = asyncHandler(async (req, res) => {
  console.log("The request body contains " + req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fileds are mandatory!");
  }
  const user = await User.create({
    name,
    email,
    phone,
    admin_id: req.admin.id
  });
  res.status(201).json(user);
});

//Get user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(user);
});

//Update user
const editUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

//Delete user
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    await User.findOneAndDelete({ _id: req.params.id }); 
    res.status(200).json(user);
});

module.exports = { getUsers, createUser, getUser, editUser, deleteUser };
