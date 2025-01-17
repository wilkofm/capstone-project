const express = require("express");
const watchlistRouter = express.Router();
const Controllers = require("../controllers");
// matches GET requests sent to /api/users

// GET all watchlists
watchlistRouter.get("/", (req, res) => {
  Controllers.watchlistController.getWatchlists(req, res);
});

// Create a new watchlist
watchlistRouter.post("/create", (req, res) => {
  Controllers.watchlistController.createWatchlist(req.body, res);
});

//Add a movie to a user's watchlist
watchlistRouter.post("/add", (req, res) => {
  Controllers.watchlistController.addToWatchlist(req, res);
});

// Update a watchlist entry
watchlistRouter.put("/:id", (req, res) => {
  Controllers.watchlistController.updateWatchlist(req, res);
});

// DELETE a watchlist entry
watchlistRouter.delete("/:userId/:movieId", (req, res) => {
  Controllers.watchlistController.deleteWatchlist(req, res);
});

module.exports = watchlistRouter;
