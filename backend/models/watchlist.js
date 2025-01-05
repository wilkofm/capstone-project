const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../dbConnect");

class Watchlist extends Model {}

Watchlist.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "watchlists",
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "movieId"], //composite primary key
      },
    ],
  }
);

module.exports = Watchlist;
