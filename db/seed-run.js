const seed = require("./seed");
const db = require("./connection");

// const data = require("./data/test")
const { genres, artists, songs } = require("./data/test");

seed(genres, artists, songs).then(() => db.end());
