const mongoose = require("mongoose");

const suggestSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  MovieId: String,
});

module.exports = mongoose.model("Suggestion", suggestSchema);
