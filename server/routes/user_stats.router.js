const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  pool
    .query(
      `SELECT "user".username, "user_stats".points, "user_stats".achievements, "user_stats".unique_speedtest, "user_stats".unique_connection, "user_stats".rank FROM "user" 
    JOIN "user_stats" ON "user".id = "user_stats".id
    WHERE "user".id = $1;`,
      [req.params.id]
    )
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result.rows[0]);
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
