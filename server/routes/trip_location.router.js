const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  pool
    .query(
      `SELECT "trip_location".id, "trip_location".trip_id, "trip_location".location_name FROM "user" 
    JOIN "user_trips" ON "user".id = "user_trips".user_id
    JOIN "trip_location" ON "user_trips".id = "trip_location".trip_id
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
      `INSERT INTO "trip_location" ("trip_id", "location_name")
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
    .query(`DELETE FROM "trip_location" WHERE id=$1;`, [req.params.id])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
module.exports = router;
