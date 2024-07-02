const User = require('../models/userModel');
const Movie = require('../models/movieModel');

exports.getWatchlist = async (req, res) => {
  try {
    const { emailId } = req.params;
    const movie = await Movie.findOne({ emailId: emailId });
    res.json(movie.movieIds);
  } catch (err) {
    console.error("Error fetching watchlist:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.removeFromWatchlist = async (req, res) => {
  try {
    const { emailId, movieId } = req.params;
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
