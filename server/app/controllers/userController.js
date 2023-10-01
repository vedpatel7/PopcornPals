const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const Suggestion = require('../models/suggestionModel');

exports.searchUsersByName = async (req, res) => {
  try {
    const { name } = req.params;
    const regex = new RegExp(`^${name}`, 'i');
    const users = await User.find({ name: { $regex: regex } });
    res.json(users);
  } catch (err) {
    console.error("Error searching for users by name:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getUserList = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching user list:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addToWatchlist = async (req, res) => {
  try {
    const { emailId, movieId } = req.body;
    const movie = await Movie.findOne({ emailId: emailId });

    if (movie) {
      movie.movieIds.push(movieId);
      await movie.save();
    } else {
      const newMovie = new Movie({
        emailId: emailId,
        movieIds: [movieId]
      });
      await newMovie.save();
    }

    res.send({ message: "Successfully added" });
  } catch (err) {
    console.error("Error adding movie:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.removeFromWatchlist = async (req, res) => {
  try {
    const { emailId, movieId } = req.body;
    const movie = await Movie.findOne({ emailId: emailId });

    if (!movie) {
      res.status(404).send({ message: "Watchlist not found" });
      return;
    }

    movie.movieIds = movie.movieIds.filter(id => id !== movieId);
    await movie.save();

    res.send({ message: "Movie removed from watchlist" });
  } catch (err) {
    console.error("Error removing movie from watchlist:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addSuggestion = async (req, res) => {
  try {
    const { sender, receiver, movieId } = req.body;
    const suggestion = new Suggestion({
      sender: sender,
      receiver: receiver,
      MovieId: movieId,
    });

    await suggestion.save();
    res.send({ message: "Suggestion added successfully" });
  } catch (err) {
    console.error("Error adding suggestion:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getSuggestions = async (req, res) => {
  try {
    const { email } = req.params;
    const suggestions = await Suggestion.find({ receiver: email });
    res.json(suggestions);
  } catch (err) {
    console.error("Error searching for users by name:", err);
    res.status(500).send("Internal Server Error");
  }
};
