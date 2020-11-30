const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const FastSpeedtest = require('fast-speedtest-api');

  const speedtestToken = YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm;

  let speedtest = new FastSpeedtest({
    token: speedtestToken, // required
    verbose: true, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps, // default: Bps
    proxy: 'http://localhost:5000',
  });

  const getSpeed = () => {
    speedtest
      .getSpeed({ mode: 'no-cors' })
      .then((s) => {
        console.log(`Speed: ${s} Mbps`);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  getSpeed();
  pool
    .query()
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Failed to get location data ', err);
      res.sendStatus(500);
    });
});
