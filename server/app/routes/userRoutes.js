const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/searchUsersByName/:name", userController.searchUsersByName);
router.get("/userList", userController.getUserList);
router.post("/addToWatchlist", userController.addToWatchlist);
router.delete("/removeFromWatchlist", userController.removeFromWatchlist);
router.post("/addSuggestion", userController.addSuggestion);
router.get("/getSuggestions/:email", userController.getSuggestions);

module.exports = router;
