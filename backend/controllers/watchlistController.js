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

// adds movie to users watchlist
const addToWatchlist = async (req, res) => {
  const { userId, movieId } = req.body;

  if (!userId || !movieId) {
    return res
      .status(400)
      .json({ message: "userId and movieId are required " });
  }

  try {
    const watchlistEntry = await Models.Watchlist.findOrCreate({
      where: { userId, movieId },
    });

    res.status(200).json({
      message: "Movie added to watchlist successfully",
      watchlist: watchlistEntry,
    });
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
  addToWatchlist,
};
