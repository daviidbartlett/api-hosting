const {
  fetchAllArtists,
  fetchArtistById,
  insertArtist,
} = require("../models/artist.model");

exports.getAllArtists = async (req, res, next) => {
  const artists = await fetchAllArtists();

  res.status(200).send({ artists });
};

exports.getArtistById = async (req, res, next) => {
  const { artist_id } = req.params;

  try {
    const artist = await fetchArtistById(artist_id);
    res.status(200).send({ artist });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

exports.postArtist = async (req, res, next) => {
  const { artist_name, rating } = req.body;

  const artist = await insertArtist(artist_name, rating);
  res.status(201).send({ artist });
};
