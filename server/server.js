const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const locationRouter = require('./routes/location.router');
const user_statsRouter = require('./routes/user_stats.router');
const user_tripsRouter = require('./routes/user_trips.router');
const trip_location = require('./routes/trip_location.router');
const leader_points = require('./routes/leader_points.router');
const leader_achievements = require('./routes/leader_achievements.router');
const speedtest = require('./routes/speedtest.router');
const WiFind = require('./routes/wifind.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //

app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/location', locationRouter);
app.use('/api/user_stats', user_statsRouter);
app.use('/api/user_trips', user_tripsRouter);
app.use('/api/trip_location', trip_location);
app.use('/api/leader_points', leader_points);
app.use('/api/leader_achievements', leader_achievements);
app.use('/api/speedtest', speedtest);
app.use('/api/wifind', WiFind);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
