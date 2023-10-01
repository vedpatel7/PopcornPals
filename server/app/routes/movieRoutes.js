const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/getWatchlist/:emailId", movieController.getWatchlist);
router.delete("/removeFromWatchlist/:emailId/:movieId", movieController.removeFromWatchlist);

module.exports = router;
