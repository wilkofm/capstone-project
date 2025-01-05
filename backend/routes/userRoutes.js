const express = require("express");
const userRouter = express.Router();
const Controllers = require("../controllers");
// matches GET requests sent to /api/users

// (the prefix from server.js)
userRouter.get("/", (req, res) => {
  Controllers.userController.getUsers(res);
});

// matches POST requests sent to /api/users/create
userRouter.post("/create", (req, res) => {
  Controllers.userController.createUser(req.body, res);
});

// matches PUT requests to /api/users/123 (stores 123 in id param)
userRouter.put("/:id", (req, res) => {
  Controllers.userController.updateUser(req, res);
});

// matches DELETE requests to /api/users/123 (123 in id param)
userRouter.delete("/:id", (req, res) => {
  Controllers.userController.deleteUser(req, res);
});

module.exports = userRouter;
