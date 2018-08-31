'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const cors = require('cors');
const passport = require('passport');
const api = require('./server/routes/api/api');
const mongoose = require('mongoose');
// DB Config
const db = require('./server/config/').mongoURI;
// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


const app = express();

app.set('port', (process.env.PORT || 3030));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./server/config/passport')(passport);

app.use('/api', api);
app.use(serveStatic(path.join(__dirname, 'build')));
require('./server/io/io')();
app.listen(app.get('port'), () => console.log(`Server is listening: http://localhost:${app.get('port')}`));