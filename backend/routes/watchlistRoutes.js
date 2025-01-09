const express = require("express");
const watchlistRouter = express.Router();
const Controllers = require("../controllers");
// matches GET requests sent to /api/users

// (the prefix from server.js)
watchlistRouter.get("/", (req, res) => {
  Controllers.watchlistController.getWatchlists(req, res);
});

// matches POST requests sent to /api/users/create
watchlistRouter.post("/create", (req, res) => {
  Controllers.watchlistController.createWatchlist(req.body, res);
});

// matches PUT requests to /api/users/123 (stores 123 in id param)
watchlistRouter.put("/:id", (req, res) => {
  Controllers.watchlistController.updateWatchlist(req, res);
});

// matches DELETE requests to /api/users/123 (123 in id param)
watchlistRouter.delete("/:id", (req, res) => {
  Controllers.watchlistController.deleteWatchlist(req, res);
});

module.exports = watchlistRouter;
