const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/auth',
    passport.authenticate('local'),
    function (req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        let user = req.user;
        res.send(user);
    });

// @route   POST api/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    // const {errors, isValid} = validateRegisterInput(req.body);
    //
    // // Check Validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
    User.findOne({email: req.body.email}).then(user => {
        if(user){
            return res.status(400).json('User already is');
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar: '',
            password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });

    });
});

module.exports = router;
