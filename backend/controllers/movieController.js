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

// creates movie
const createMovie = (data, res) => {
  Models.Movie.create(data)
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
        attributes: ["rating", "review"],
      },
      {
        model: Models.User,
        attributes: ["userName", "emailId"],
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
};
