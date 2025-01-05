const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../dbConnect");

class Review extends Model {}

Review.init(
  {
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10,
      },
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "reviews",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Review;
