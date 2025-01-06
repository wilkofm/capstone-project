const express = require("express");
const reviewRouter = express.Router();
const Controllers = require("../controllers");
// matches GET requests sent to /api/users

// (the prefix from server.js)
reviewRouter.get("/", (req, res) => {
  Controllers.reviewController.getReviews(res);
});

// matches POST requests sent to /api/users/create
reviewRouter.post("/create", (req, res) => {
  Controllers.reviewController.createReview(req.body, res);
});

// matches PUT requests to /api/users/123 (stores 123 in id param)
reviewRouter.put("/:id", (req, res) => {
  Controllers.reviewController.updateReview(req, res);
});

// matches DELETE requests to /api/users/123 (123 in id param)
reviewRouter.delete("/:id", (req, res) => {
  Controllers.reviewController.deleteReview(req, res);
});

//Join requests
reviewRouter.get("/details", (req, res) => {
  Controllers.reviewController.getReviewWithDetails(req, res);
});

module.exports = reviewRouter;
