"use strict";
const Models = require("../models");

// finds watchlists
const getWatchlists = (req, res) => {
  Models.Watchlist.findAll({
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

// creates watchlist
const createWatchlist = (data, res) => {
  Models.Watchlist.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// updates watchlist
const updateWatchlist = (req, res) => {
  Models.Watchlist.update(req.body, {
    where: { userId: req.params.id, movieId: req.params.id },
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

// deletes watchlist
const deleteWatchlist = (req, res) => {
  Models.Watchlist.destroy({
    where: { userId: req.params.id, movieId: req.params.id },
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
  getWatchlists,
  createWatchlist,
  updateWatchlist,
  deleteWatchlist,
};
