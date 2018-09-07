const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
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

// @route   GET api/profile
// @desc    Get profile user
// @access  Private
router.get(
    '/profile',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .populate('user', ['name'])
            .then(profile => {
                if (!profile) {
                    res.status(404).json('There is no profile for this user');
                }

                res.json(profile);
            })
            .catch(err =>
                res.status(404).json('There is no profile for this user')
            );

    }
);
// @route   POST api/profile
// @desc    Save profile user
// @access  Private
router.post(
    '/profile',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.text) profileFields.text= req.body.text;
        if (req.body.youtube) profileFields.youtube = req.body.youtube;
        if (req.body.vk) profileFields.vk = req.body.vk;
        if (req.body.fb) profileFields.fb = req.body.fb;

        Profile.findOne({ user: req.user.id }).then(profile => {
            if (profile) {
                // Update
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile));
            } else {
                    // Save Profile
                    new Profile(profileFields).save().then(profile => res.json(profile));
                }
        });
    }
);

module.exports = router;
