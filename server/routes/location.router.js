const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `	SELECT * FROM "location";`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Failed to get location data ', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  pool
    .query(
      `INSERT INTO "location" ("long", "lat", "wifi_name", "location_name")
      VALUES ($1, $2, $3, $4)
      RETURNING id;`,
      [req.body.long, req.body.lat, req.body.SSID, req.body.location_name]
    )
    .then((result) => {
      res.send({
        result: result.rows[0],
        user_id: req.body.user_id,
        speed: req.body.speed,
      });
    })
    .catch((err) => {
      console.log('Failed to post location data ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
