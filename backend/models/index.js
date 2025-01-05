"use strict";
const Movie = require("./movie"); //require the model
const Review = require("./review");
const User = require("./user");
const Watchlist = require("./watchlist");

Review.belongsTo(Movie, { foreignKey: "movieId" }); //a review belongs to an movie
Movie.hasMany(Review, { foreignKey: "movieId" }); //a movie can have many reviews

Review.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Review, { foreignKey: "userId" });

Watchlist.belongsTo(User, { foreignKey: "userId" }); //a review belongs to a user
User.hasMany(Watchlist, { foreignKey: "userId" });

Watchlist.belongsTo(Movie, { foreignKey: "movieId" });
Movie.hasMany(Watchlist, { foreignKey: "movieId" });

async function init() {
  try {
    await User.sync();
    await Movie.sync();
    await Review.sync();
    await Watchlist.sync();
    console.log("Models synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
}

init();

module.exports = {
  Movie,
  Review,
  User,
  Watchlist,
};
