const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected Successfully'))
  .catch(error => console.log(error));

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);

app.listen(9002, () => {
  console.log("Started on port 9002");
});
