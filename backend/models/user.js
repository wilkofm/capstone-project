const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../dbConnect");

class User extends Model {}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = User;
