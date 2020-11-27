const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  pool
    .query(
      `SELECT "user_trips".id, "user_trips".trip_name FROM "user" 
    JOIN "user_trips" ON "user".id = "user_trips".user_id
    WHERE "user".id = $1;`,
      [req.params.id]
    )
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Failed to get location data ', err);
      res.sendStatus(500);
    });
});

router.post('/:id', (req, res) => {
  pool
    .query(
      `INSERT INTO "user_trips" ("user_id", "trip_name")
      VALUES ($1, $2)
      RETURNING "id";`,
      [req.params.id, req.body.data]
    )
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log('Failed to get location data ', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  pool
    .query(`DELETE FROM "trip_location" WHERE trip_id=$1;`, [req.params.id])
    .then((dbResponse) => {
      pool
        .query(`DELETE FROM "user_trips" WHERE id=$1;`, [req.params.id])
        .then((dbResponse) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
module.exports = router;
