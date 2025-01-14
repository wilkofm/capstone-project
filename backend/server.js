const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./dbConnect");

let movieRoutes = require("./routes/movieRoutes");
let reviewRoutes = require("./routes/reviewRoutes");
let userRoutes = require("./routes/userRoutes");
let watchlistRoutes = require("./routes/watchlistRoutes");

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// parse requests of content-type - application / json;
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/watchlists", watchlistRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my movie collection database." });
});

//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
