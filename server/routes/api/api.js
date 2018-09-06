const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/auth', (req, res) => {
    let errors = {};
    const email = req.body.login;
    const password = req.body.password;

    // Find user by email
    User.findOne({email}).then(user => {
        // Check for user
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User Matched
                const payload = {id: user.id, name: user.name}; // Create JWT Payload

                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {expiresIn: 3600},
                    (err, token) => {
                        res.json({
                            success: true,
                            token: token
                        });
                    }
                );
            } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
            }
        });
    });
});


// @route   POST api/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if (user) {
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

// @route   POST api/profile
// @desc    Get profile user
// @access  Private
router.get(
    '/profile',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({
            auth: true,
            user: {
                id: req.user.id,
                name: req.user.name,
                avatar: req.user.avatar,
                email: req.user.avatar
            }
        });
    }
);
router.post(
    '/profile',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({
            auth: true,

        });
    }
);

module.exports = router;
