"use strict";
const Models = require("../models");
const bcrypt = require("bcrypt");

// finds users
const getUsers = (req, res) => {
  Models.User.findAll({
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

// creates users
const createUser = async (data, res) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = { ...data, password: hashedPassword };

    const user = await Models.User.create(userData);
    res.send({ result: 200, data: user });
  } catch (err) {
    console.log(err);
    res.send({ result: 500, error: err.message });
  }
};

// updates users
const updateUser = (req, res) => {
  Models.User.update(req.body, {
    where: { userId: req.params.id },
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

// deletes users
const deleteUser = (req, res) => {
  Models.User.destroy({ where: { userId: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//joins user
const getUserWithDetails = (req, res) => {
  Models.User.findAll({
    include: [
      {
        model: Models.Review, //joins with Review
        attributes: ["rating", "review"],
        include: [
          {
            model: Models.Movie,
            attributes: ["movieTitle", "year", "genre"],
          },
        ],
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
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserWithDetails,
};
