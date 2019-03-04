const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();
require('dotenv').config();

/* login route */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(403).json({
                errors: ['Login or Password is Incorrect']
            });
        }
        req.login(user, { session: false }, err => {
            if (err) {
                res.status(500).json({ errors: 'Login failed due to unknown reason' });
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user.toObject(), process.env.JWT_SECRET);
            return res.status(200).json({ token });
        });
    })(req, res);
});

module.exports = router;
