const express = require("express");
const movieRouter = express.Router();
const Controllers = require("../controllers");

// GET all movies
movieRouter.get("/", (req, res) => {
  Controllers.movieController.getMovies(req, res);
});

// GET individual movie
movieRouter.get("/:id", (req, res) => {
  Controllers.movieController.getMovieById(req, res);
});

// matches POST requests sent to /api/users/create
movieRouter.post("/create", (req, res) => {
  Controllers.movieController.createMovie(req, res);
});

// matches PUT requests to /api/users/123
movieRouter.put("/:id", (req, res) => {
  Controllers.movieController.updateMovie(req, res);
});

// matches DELETE requests to /api/users/123
movieRouter.delete("/:id", (req, res) => {
  Controllers.movieController.deleteMovie(req, res);
});

//Join requests
movieRouter.get("/details", (req, res) => {
  Controllers.movieController.getMovieWithDetails(req, res);
});

module.exports = movieRouter;
