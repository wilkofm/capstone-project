const express = require("express");
const userRouter = express.Router();
const Controllers = require("../controllers");
const bcrypt = require("bcrypt");
// matches GET requests sent to /api/users

// matches GET requests sent to /api/users/login
userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getMoviesWithDetails.User.findOne({
      where: { userName: username },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// (the prefix from server.js)
userRouter.get("/", (req, res) => {
  Controllers.userController.getUsers(req, res);
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

//Join requests
userRouter.get("/details", (req, res) => {
  Controllers.userController.getUserWithDetails(req, res);
});

module.exports = userRouter;
