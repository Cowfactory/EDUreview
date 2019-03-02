const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

/* --- Adds a new user to db --- */
router.post('/', (req, res, next) => {
    if (!req.body.email) {
        res.status(422).json({ message: 'Email field is required' });
    }
    if (!req.body.username) {
        res.status(422).json({ message: 'Username field is required' });
    }
    if (!req.body.password) {
        res.status(422).json({ message: 'Password field is required' });
    }

    // See if the email is already in the DB
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            // Email is already in the DB. Alert the user.
            res.status(422).json({ message: 'Email already exists' });
        }
        if (err) {
            res.status(422).json(err);
        }
        // Email is available, create the user in the DB
        User.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            },
            (err, user) => {
                if (err) {
                    res.status(422).json({ message: err });
                }
                // Create JWT
                const userNoPass = user.toObject();
                const token = jwt.sign(userNoPass, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24
                });
                // Return user and token
                res.status(201).json({
                    user: userNoPass,
                    token
                });
            }
        );
    });
});

/* --- Gets all users from db --- */
router.get('/', (req, res) => {});

module.exports = router;
