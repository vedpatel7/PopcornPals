const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const bcrypt = require('bcrypt');

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

const suggestSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  MovieId: String
})

const Suggestion = mongoose.model("Suggestion", suggestSchema)
const User = mongoose.model("User", userSchema)
const Movie = mongoose.model("Movie", movieSchema)

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.send({ message: "User not found" });
      }
      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        if (result) {
          res.json({ message: "Login successful", user: user });
        } else {
          res.send({ message: "Incorrect password" });
        }
      });
    })
    .catch((err) => {
      console.error("Error checking user:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Password strength requirements
  const minLength = 8; // Minimum password length
  const requiresUpperCase = /[A-Z]/; // Requires at least one uppercase letter
  const requiresLowerCase = /[a-z]/; // Requires at least one lowercase letter
  const requiresDigit = /[0-9]/; // Requires at least one digit
  const requiresSpecialChar = /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/; // Requires at least one special character

  // Check if the password meets the strength requirements
  if (
    password.length < minLength ||
    !requiresUpperCase.test(password) ||
    !requiresLowerCase.test(password) ||
    !requiresDigit.test(password) ||
    !requiresSpecialChar.test(password)
  ) {
    return res.send({
      message: "Password does not meet the minimum requirements.",
    });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.send({ message: "User already registered." });
      } else {
        // Hash the password before saving it to the database
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({ message: "Internal Server Error" });
          }

          const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
          });

          newUser
            .save()
            .then(() => {
              res.send({ message: "Successfully registered." });
            })
            .catch((err) => {
              console.error("Error registering user:", err);
              res.status(500).json({ message: "Internal Server Error" });
            });
        });
      }
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});


app.post("/watchlist", (req, res) => {
  const { emailId, movieId } = req.body;
  // console.log(emailId);

  Movie.findOne({ emailId: emailId })
    .then((movie) => {
      if (movie) {
        if (!movie.movieIds.includes(movieId)) {
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
          res.send({ message: "Movie already in watchlist" });
        }
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
  Movie.findOne({ emailId: `"${emailId}"` })
    .then((movie) => {
      res.json(movie.movieIds);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.delete('/watchlist/:emailId/:movieId', (req, res) => {
  const { emailId, movieId } = req.params;
  // console.log(emailId . movieId)
  Movie.findOne({ emailId: `"${emailId}"` })
    .then((movie) => {
      if (!movie) {
        res.status(404).send({ message: "Watchlist not found" });
        return;
      }

      movie.movieIds = movie.movieIds.filter(id => id !== movieId);

      movie.save()
        .then(() => {
          res.send({ message: "Movie removed from watchlist" });
        })
        .catch((err) => {
          console.error("Error removing movie from watchlist:", err);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((err) => {
      console.error("Error finding watchlist:", err);
      res.status(500).send("Internal Server Error");
    });
});


app.get('/searchUsersByName/:name', (req, res) => {
  const { name } = req.params;
  const regex = new RegExp(`^${name}`, 'i');
  User.find({ name: { $regex: regex } })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error("Error searching for users by name:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.get('/userList', (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error("Error fetching user list:", err);
      res.status(500).send("Internal Server Error");
    });
})

app.post("/addSuggestion", (req, res) => {
  const { sender, receiver, movieId } = req.body;
  // console.log(req.body);
  const suggestion = new Suggestion({
    sender: sender,
    receiver: receiver,
    MovieId: movieId,
  });

  suggestion.save()
    .then(() => {
      res.send({ message: "Suggestion added successfully" });
    })
    .catch((err) => {
      console.error("Error adding suggestion:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.get('/suggestions/:email', (req, res) => {
  // console.log("nnnnnnni");
  const { email } = req.params;
  // console.log(email);
  Suggestion.find({ receiver: `${email}` })
    .then((suggestion) => {
      // console.log(suggestion);
      res.json(suggestion);
    })
    .catch((err) => {
      console.error("Error searching for users by name:", err);
      res.status(500).send("Internal Server Error");
    });
});


app.listen(9002, () => {
  console.log("Started on port 9002")
})