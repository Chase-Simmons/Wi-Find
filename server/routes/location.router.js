const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `SELECT "location".id, "location".lat, "location".long, "location".wifi_name, "location".location_name, "location".location_address, ARRAY_AGG("speedtest".test_result) as avg_speed FROM "location"
  LEFT JOIN "speedtest" ON "location".id = "speedtest".location_id
  GROUP BY "location".id
  ORDER BY "location".lat DESC;`;
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
      `INSERT INTO "location" ("long", "lat", "wifi_name", "location_name", "location_address")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;`,
      [
        req.body.long,
        req.body.lat,
        req.body.SSID,
        req.body.location_name,
        req.body.location_address,
      ]
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
