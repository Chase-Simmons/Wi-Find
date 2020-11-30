const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  pool
    .query(
      `SELECT "user".id, "user".username, "user_stats".points FROM "user" 
      JOIN "user_stats" ON "user".id = "user_stats".user_id
      ORDER BY "user_stats".points DESC;`
    )
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Failed to get leader_points data ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
