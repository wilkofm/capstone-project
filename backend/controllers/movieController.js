"use strict";
const Models = require("../models");

// finds movies
const getMovies = (req, res) => {
  Models.Movie.findAll({
    where: req.query,
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// finds movie by Id
const getMovieById = (req, res) => {
  const movieId = req.params.id;

  Models.Movie.findOne({
    where: { movieId },
    include: [
      {
        model: Models.Review,
        attributes: ["userId", "rating", "review"],
        include: [
          {
            model: Models.User,
            attributes: ["userName"],
          },
        ],
      },
    ],
  })
    .then((movie) => {
      if (movie) {
        res.send({ result: 200, data: movie });
      } else {
        res.status(404).send({ result: 404, message: "Movie not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

// creates movie
const createMovie = (req, res) => {
  Models.Movie.bulkCreate(req.body)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// updates movie
const updateMovie = (req, res) => {
  Models.Movie.update(req.body, {
    where: { movieId: req.params.id },
    returning: true,
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// deletes movie
const deleteMovie = (req, res) => {
  Models.Movie.destroy({ where: { movieId: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//joins movies
const getMoviesWithDetails = (req, res) => {
  Models.Movie.findAll({
    include: [
      {
        model: Models.Review, //joins with review
        attributes: ["userId", "rating", "review"],
      },
      {
        model: Models.User,
        attributes: ["userName"],
      },
    ],
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMoviesWithDetails,
  getMovieById,
};
