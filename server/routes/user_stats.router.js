const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  pool
    .query(
      `SELECT "user".username, "user_stats".points, "user_stats".achievements, "user_stats".unique_speedtest, "user_stats".unique_connection, "user_stats".rank, "user_stats".avatar FROM "user" 
    JOIN "user_stats" ON "user".id = "user_stats".user_id
    WHERE "user".id = $1;`,
      [req.params.id]
    )
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log('Failed to get user_stats data ', err);
      res.sendStatus(500);
    });
});

router.post('/:id', (req, res) => {
  pool
    .query(
      `INSERT INTO "user_stats" ("user_id")
      VALUES ($1);`,
      [req.params.id]
    )
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log('Failed to post user_stats data ', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  console.log(req.body);
  pool
    .query(
      `UPDATE "user_stats"
  SET "avatar" = $2
  WHERE id=$1;`,
      [req.params.id, req.body.avatar]
    )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Failed to put trip data ', err);
      res.sendStatus(500);
    });
});
module.exports = router;
