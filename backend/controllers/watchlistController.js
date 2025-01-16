"use strict";
const Models = require("../models");

// finds watchlists
const getWatchlists = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res
      .status(400)
      .send({ result: 400, message: "User ID is required" });
  }

  try {
    const watchlist = await Models.Watchlist.findAll({
      where: { userId },
      include: [
        {
          model: Models.Movie, //Joins with the movie table
          attributes: [
            "movieId",
            "movieTitle",
            "poster",
            "genre",
            "year",
            "imdbRating",
            "director",
            "description",
          ],
        },
      ],
    });

    res.send({ result: 200, data: watchlist });
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).send({ result: 500, message: "Internal Server Error" });
  }
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
const deleteWatchlist = async (req, res) => {
  const { userId, movieId } = req.params;

  try {
    const result = await Models.Watchlist.destroy({
      where: { userId, movieId },
    });

    if (result) {
      res.status(200).json({ message: "Movie removed from watchlist" });
    } else {
      res.status(404).json({ message: "Entry not found" });
    }
  } catch (error) {
    console.error("Error removing movie from watchlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getWatchlists,
  createWatchlist,
  updateWatchlist,
  deleteWatchlist,
  addToWatchlist,
};
