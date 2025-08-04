const seed = require("./seed");
const db = require("./connection");

const { genres, artists, songs } = require("./data");

seed(genres, artists, songs).then(() => db.end());
