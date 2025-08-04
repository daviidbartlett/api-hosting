const db = require("./connection");
const format = require("pg-format");
const createArtistRef = require("./utils");

async function seed(genres, artists, songs) {
  //drop genres table
  await db.query(`DROP TABLE IF EXISTS songs`);
  await db.query(`DROP TABLE IF EXISTS genres`);
  await db.query(`DROP TABLE IF EXISTS artists`);
  // create genres table
  await db.query(`CREATE TABLE genres(
      genre_name VARCHAR(40) PRIMARY KEY,
      description TEXT
      );`);

  //create artists table
  await db.query(`CREATE TABLE artists(
      artist_id SERIAL PRIMARY KEY,
      artist_name VARCHAR(40) NOT NULL,
      rating INT);`);

  // create artists table
  await db.query(`CREATE TABLE songs(
        song_id SERIAL PRIMARY KEY,
        song_title VARCHAR(40) NOT NULL,
        release_year INT,
        artist_id INT NOT NULL REFERENCES artists(artist_id),
        genre VARCHAR REFERENCES genres(genre_name)
        );`);

  //inserting data into genres table

  const formattedGenresData = genres.map(({ genre_name, description }) => [
    genre_name,
    description,
  ]);
  await db.query(
    format(
      `INSERT INTO genres (genre_name, description) VALUES %L`,
      formattedGenresData
    )
  );

  const formattedArtistsData = artists.map(({ artist_name, rating }) => [
    artist_name,
    rating,
  ]);
  const { rows: insertedArtists } = await db.query(
    format(
      `INSERT INTO artists (artist_name, rating) VALUES %L RETURNING *`,
      formattedArtistsData
    )
  );

  const ref = createArtistRef(insertedArtists);

  const formattedSongs = songs.map((song) => {
    return [song.title, song.release_year, ref[song.artist_name], song.genre];
  });

  const { rows: insertedSongs } = await db.query(
    format(
      "INSERT INTO songs (song_title, release_year, artist_id, genre) VALUES %L RETURNING *;",
      formattedSongs
    )
  );
}
module.exports = seed;
