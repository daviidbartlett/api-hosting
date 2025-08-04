function createArtistRef(artistData) {
  const ref = {};
  artistData.forEach(({ artist_name, artist_id }) => {
    ref[artist_name] = artist_id;
  });

  return ref;
}

module.exports = createArtistRef;
