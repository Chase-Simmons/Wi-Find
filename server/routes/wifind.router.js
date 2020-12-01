const express = require('express');
const router = express.Router();

const WiFiControl = require('wifi-control');

router.get('/', (req, res) => {
  WiFiControl.init({
    debug: true,
  });

  /*-----> SEARCH AREA FOR WIFI ROUTERS <-----*/
  // WiFiControl.scanForWiFi(function (err, response) {
  //   res.send(response);
  // });
  /*-----> SEARCH AREA FOR WIFI ROUTERS <-----*/

  const ifaceState = WiFiControl.getIfaceState();

  res.send(ifaceState.ssid);
});

module.exports = router;
