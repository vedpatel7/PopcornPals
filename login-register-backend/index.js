const express = require ("express");
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
  movieIds: [String]
});

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
  console.log(emailId);
  Movie.findOne({ emailId: emailId })
    .then((movie) => {
      if (movie) {
        movie.movieIds.push(movieId);
        movie.save()
          .then(() => {
            res.send({ message: "Successfully added" });
          })
          .catch((err) => {
            console.error("Error adding movie:", err);
            res.status(500).send("Internal Server Error");
          });
          
      } else {
        const newMovie = new Movie({
          emailId: emailId,
          movieIds: [movieId]
        });
        newMovie.save()
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
      console.log(err);
    });
});

app.get('/watchlist/:emailId', (req, res) => {
  const { emailId } = req.params;
    Movie.findOne({ emailId:`"${emailId}"`})
    .then((movie) => {
      res.json(movie.movieIds);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get('/searchUsersByName/:name', (req, res) => {
  const { name } = req.params;
  console.log(`Searching for users by name: ${name}`);
  User.find({ name: name})
    .then((users) => {
      console.log('Found users:', users);
      res.json(users);
    })
    .catch((err) => {
      console.error("Error searching for users by name:", err);
      res.status(500).send("Internal Server Error");
    });
});


app.listen(9002, () => {
  console.log("Started on port 9002")
})