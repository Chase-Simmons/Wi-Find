const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
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
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
