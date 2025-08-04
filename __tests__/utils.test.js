const createArtistRef = require("../db/utils");

describe("createArtistRef", () => {
  test("returns object", () => {
    expect(typeof createArtistRef([])).toBe("object");
  });
  test("assigns artist_name as key in object ", () => {
    const data = [{ id: 1, artist_name: "Taylor Swift", rating: 5 }];

    const ref = createArtistRef(data);

    expect(ref.hasOwnProperty("Taylor Swift")).toBe(true);
  });
  test("assigns id as value to under artist's name ", () => {
    const data = [{ artist_id: 1, artist_name: "Taylor Swift", rating: 5 }];

    const ref = createArtistRef(data);

    expect(ref["Taylor Swift"]).toBe(1);
  });
  test("assigns key-value pairs for multiple artists", () => {
    expect(
      createArtistRef([
        { artist_id: 1, artist_name: "Taylor Swift", rating: 5 },
        { artist_id: 2, artist_name: "Dolly Parton", rating: 3 },
        { artist_id: 3, artist_name: "Black Sabbath", rating: 2 },
        { artist_id: 4, artist_name: "Lynyrd Skynyrd", rating: 4 },
      ])
    ).toEqual({
      "Taylor Swift": 1,
      "Dolly Parton": 2,
      "Black Sabbath": 3,
      "Lynyrd Skynyrd": 4,
    });
  });
});
