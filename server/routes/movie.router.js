const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  const sqlText = 'SELECT * FROM "movies";';
  pool
    .query(sqlText)
    .then((result) => {
      console.log("rows" + result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error fetching movies from db: ", error);
      res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  // const sqlText =
  //   "SELECT title, poster, description, name  FROM movie_genre JOIN movies ON movies.id = movie_genre.movies_id JOIN genres ON movie_genre.genres_id = genres.id WHERE movies.id = $1";
  const sqlText =
    "SELECT title, poster, description, name  FROM movie_genre JOIN movies ON movies.id = movie_genre.movies_id WHERE movies.id = $1";
  pool
    .query(sqlText, [id])
    .then((result) => {
      // console.log(result.rows[0]);
      console.log(result);
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log("Error getting details from db in get router: ", error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log("New Movie Id:", result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;

      // Depending on how you make your junction table, this insert COULD change.
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movies_id", "genres_id")
      VALUES  ($1, $2);
      `;
      // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
