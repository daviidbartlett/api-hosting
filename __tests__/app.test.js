const request = require("supertest");
const app = require("../app");
const seed = require("../db/seed");
const { genres, artists, songs } = require("../db/data/test/index");
const db = require("../db/connection");

beforeEach(() => seed(genres, artists, songs));
afterAll(() => db.end());

describe("app", () => {
  test("non-existent endpoint responds with 404 and msg", async () => {
    const { body } = await request(app).get("/non-existent-path").expect(404);

    expect(body.msg).toBe("Path not found");
  });
  describe("GET - /api/artists", () => {
    test("responds with status of 200", async () => {
      await request(app).get("/api/artists").expect(200);
    });

    test("responds with an array of artists that contains artists_id, artist_name and rating", async () => {
      // const response = await request(app).get("/api/artists");
      const { body } = await request(app).get("/api/artists");

      expect(Array.isArray(body.artists)).toBe(true);
      expect(body.artists.length > 0).toBe(true);
      body.artists.forEach((artist) => {
        expect(artist.hasOwnProperty("artist_id")).toBe(true);
        expect(artist.hasOwnProperty("artist_name")).toBe(true);
        expect(artist.hasOwnProperty("rating")).toBe(true);
      });
    });
  });

  describe("GET - /api/artists/:id", () => {
    test("status 200: responds with an object for the specific artist", async () => {
      const { body } = await request(app).get("/api/artists/1").expect(200);

      expect(body.artist).toEqual({
        artist_id: 1,
        artist_name: "Taylor Swift",
        rating: 5,
      });
    });
    test("status 400: invalid ID, responds with an error message of Bad request ", async () => {
      const { body } = await request(app)
        .get("/api/artists/invalid-id")
        .expect(400);

      expect(body.msg).toBe("Bad Request");
    });
    test("status 404: valid but non-existent ID, responds with an error message of artist not found", async () => {
      const { body } = await request(app).get("/api/artists/9999").expect(404);

      expect(body.msg).toBe("Artist not found");
    });
  });

  describe("POST - /api/artists", () => {
    test("status 201: responds with the newly posted artist", async () => {
      const { body } = await request(app)
        .post("/api/artists")
        .send({ artist_name: "The XX", rating: 5 })
        .expect(201);

      expect(body.artist).toEqual({
        artist_id: 5,
        artist_name: "The XX",
        rating: 5,
      });
    });
  });
});
