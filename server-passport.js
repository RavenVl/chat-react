'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const cors = require('cors');
const passport = require('passport');
const auth = require('./server/routes/api/auth');
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
require('./server/authentication').init(app);
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', auth);
app.use(serveStatic(path.join(__dirname, 'build')));
//Run IO server
const portIo = 3060;
const io = require('socket.io')();
io.on('connection', (client) => {
    client.on('setData', (data) => {
        console.log('client send data ', data);
        io.emit('getData', data);

    });
});
io.listen(portIo);
app.listen(app.get('port'), () => console.log(`Server is listening: http://localhost:${app.get('port')}`));