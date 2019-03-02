const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();
require('dotenv').config();

/* login route */
router.post('/login', (req, res, next) => {
    console.log(req.body);

    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(403).json({
                error: 'Login or Password is Incorrect'
            });
        }
        req.login(user, { session: false }, err => {
            if (err) {
                res.status(500).json(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({ user, token });
        });
    })(req, res);
});

module.exports = router;
