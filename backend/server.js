const express = require("express");
const app = express();
require("dotenv").config();
let dbConnect = require("./dbConnect");
let albumRoutes = require("./routes/albumRoutes");
let artistRoutes = require("./routes/artistRoutes");
let reviewRoutes = require("./routes/reviewRoutes");
let userRoutes = require("./routes/userRoutes");

// parse requests of content-type - application / json;
app.use(express.json());
app.use("/api/albums", albumRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my album reviewer database." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port
${PORT}.`);
});
