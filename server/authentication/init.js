const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const authenticationMiddleware = require('./middleware');


passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('deserialize');
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

function initPassport() {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (username, password, done) => {
        console.log('find user');
            return done(null, {user:'user'})
            // User.findOne({username: username}, function (err, user) {
            //     if (err) {
            //         return done(err)
            //     }
            //     if (!user) {
            //         console.log('User not found');
            //         return done(null, false)
            //     }
            //     // Always use hashed passwords and fixed time comparison
            //     bcrypt.compare(password, user.password, (err, isValid) => {
            //         if (err) {
            //             return done(err)
            //         }
            //         if (!isValid) {
            //             return done(null, false)
            //         }
            //         return done(null, user)
            //     })
            // });
        }))
}

passport.authenticationMiddleware = authenticationMiddleware;


module.exports = initPassport;
