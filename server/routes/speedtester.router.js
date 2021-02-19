const FastSpeedtest = require('fast-speedtest-api');
const speedtestToken = process.env.REACT_APP_SPEEDTEST_TOKEN;
let speedtest = new FastSpeedtest({
  token: speedtestToken, // required
  verbose: false, // default: false
  timeout: 5000, // default: 5000
  https: false, // default: true
  urlCount: 5, // default: 5
  bufferSize: 8, // default: 8
  unit: FastSpeedtest.UNITS.Mbps, // default: Bps
  proxy: 'http://wi-find.herokuapp.com',
});
/*-----> SPEEDTEST-API <-----*/
