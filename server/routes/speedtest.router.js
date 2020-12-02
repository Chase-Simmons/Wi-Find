const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `	SELECT * FROM "speedtest";`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Failed to get speedtest data ', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  pool
    .query(
      `INSERT INTO "speedtest" ("user_id", "location_id", "test_result")
      VALUES ($1, $2, $3);`,
      [req.body.user_id, req.body.location_id, req.body.speed]
    )
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Failed to post speedtest data ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
