const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
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
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
