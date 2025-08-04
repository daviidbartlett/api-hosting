const db = require("../db/connection");

exports.fetchAllArtists = async () => {
  const { rows } = await db.query("SELECT * FROM artists;");
  return rows;
};

exports.fetchArtistById = async (id) => {
  const { rows } = await db.query(
    "SELECT * FROM artists WHERE artist_id = $1;",
    [id]
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, msg: "Artist not found" });
  }
  return rows[0];
};

exports.insertArtist = async (artist_name, rating) => {
  const { rows } = await db.query(
    "INSERT INTO artists (artist_name, rating) VALUES ($1, $2) RETURNING *",
    [artist_name, rating]
  );

  return rows[0];
};
