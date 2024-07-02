const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  emailId: String,
  movieIds: [String],
});

module.exports = mongoose.model("Movie", movieSchema);
