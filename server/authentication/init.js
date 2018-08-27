const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const authenticationMiddleware = require('./middleware');

// Generate Password
const saltRounds = 10;
const myPlaintextPassword = '123';
const salt = bcrypt.genSaltSync(saltRounds);
const passwordHash1 = bcrypt.hashSync(myPlaintextPassword, salt);
const passwordHash2= bcrypt.hashSync('456', salt);

const users = [
    {
        userId:'001',
        token: 'token001',
        name: 'user1',
        login:'123',
        password: passwordHash1
    },
    {
        userId:'002',
        token: 'token002',
        name: 'user2',
        login:'456',
        password: passwordHash2
    }
];

function findUser (username, callback) {
    let findUser = users.find((user)=>{
        return user.login===username;
    });
  if (findUser!== undefined) {
    return callback(null, findUser)
  }
  return callback(null)
}

passport.serializeUser(function (user, cb) {
  cb(null, user.login)
});

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
});

function initPassport () {
  passport.use(new LocalStrategy({
      usernameField: 'login',
      passwordField: 'password'
  },
    (username, password, done) => {
      findUser(username, (err, user) => {
        if (err) {
          return done(err)
        }

        // User not found
        if (!user) {
          console.log('User not found');
          return done(null, false)
        }

        // Always use hashed passwords and fixed time comparison
        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err) {
            return done(err)
          }
          if (!isValid) {
            return done(null, false)
          }
          return done(null, user)
        })
      })
    }
  ));

  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport;
