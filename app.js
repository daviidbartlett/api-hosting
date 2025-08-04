const express = require("express");
const {
  getAllArtists,
  getArtistById,
  postArtist,
} = require("./controllers/artists.controller");
const {
  handlePathNotFound,
  handleBadRequests,
  handleCustomErrors,
} = require("./controllers/errors.controller");

const app = express();
app.use(express.json());

app.get("/api/artists", getAllArtists);
app.get("/api/artists/:artist_id", getArtistById);
app.post("/api/artists", postArtist);
app.all("/*invalid", handlePathNotFound);

app.use(handleBadRequests);
app.use(handleCustomErrors);
module.exports = app;
