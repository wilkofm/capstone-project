const express = require("express");
const app = express();
require("dotenv").config();
let dbConnect = require("./dbConnect");
let movieRoutes = require("./routes/movieRoutes");
let reviewRoutes = require("./routes/reviewRoutes");
let userRoutes = require("./routes/userRoutes");
let watchlistRoutes = require("./routes/watchlistRoutes");

// parse requests of content-type - application / json;
app.use(express.json());
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/watchlists", watchlistRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my movie collection database." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port
${PORT}.`);
});
