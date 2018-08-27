const express = require('express');
const router = express.Router();
const passport = require('passport');
// @route   GET /auth
// @desc    Tests post route
// @access  Public
router.post('/',
    passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        let user = req.user;
        res.send(user);
    });
module.exports = router;
