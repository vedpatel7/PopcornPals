const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));


mongoose.connect("mongodb://127.0.0.1:27017/userDB"
  , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected Successfully'))
  .catch(error => console.log(error));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

const movieSchema = new mongoose.Schema({
  emailId: String,
  movieId: String
})

const User = mongoose.model("User", userSchema)
const Movie = mongoose.model("Movie", movieSchema)

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (password === user.password) {
          res.send({ message: "Login successful", user: user });
        } else {
          res.send({ message: "Incorrect password" });
        }
      } else {
        res.send({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.error("Error checking user:", err);
      res.status(500).send("Internal Server Error");
    });
});


app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (user)
        res.send({ message: "user already registered" })

      else {
        const user = new User({
          name: name,
          email: email,
          password: password
        })
        user.save()
          .then(() => {
            res.send({ message: "Successfully registered" });
          })
          .catch((err) => {
            console.error("Error registering user:", err);
            res.status(500).send("Internal Server Error");
          });
      }

    })
    .catch(function (err) {
      console.log(err)
    })

})

app.post("/watchlist", (req, res) => {
  const { emailId, movieId } = req.body;
  Movie.findOne({ $and: [{ emailId: emailId }, { movieId: movieId }] })
    .then((movie) => {
      if (movie)
        res.send({ message: "movie already added" })

      else {
        const movie = new Movie({
          emailId: emailId,
          movieId: movieId
        })
        movie.save()
          .then(() => {
            res.send({ message: "Successfully added" });
          })
          .catch((err) => {
            console.error("Error adding movie:", err);
            res.status(500).send("Internal Server Error");
          });
      }
    })
    .catch(function (err) {
      console.log(err)
    });
})


app.listen(9002, () => {
  console.log("Started on port 9002")
})