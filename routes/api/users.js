const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

router.get('/:id', (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            return res.status(200).json(user.toObject());
        })
        .catch(err => {
            return res.status(422).json({ errors: ['Error searching for user names'] });
        });
});

/* --- Adds a new user to db --- */
router.post('/', (req, res, next) => {
    const { email, username, password } = req.body;
    const errObj = {};

    if (!email) {
        errObj.errors.email = 'Email field is required';
    }
    if (!username) {
        errObj.errors.username = 'Username field is required';
    }
    if (!password) {
        errObj.errors.password = 'Password field is required';
    }
    if (Object.keys(errObj).length > 0) {
        console.log('asdf');
        return res.status(400).json(errObj);
    }

    // See if the email is already in the DB
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            // Email is already in the DB. Alert the user.
            return res.status(422).json({
                errors: {
                    email: 'Email already in use'
                }
            });
        }
        if (err) {
            return res.status(422).json({
                errors: {
                    generic: 'Error in database lookup'
                }
            });
        }
        // Email is available, create the user in the DB
        User.create(
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            },
            (err, user) => {
                if (err) {
                    // Extract the err message and send to user
                    const obj = {};
                    for (const key of Object.keys(err.errors)) {
                        obj[key] = err.errors[key].message;
                    }
                    return res.status(422).json({ errors: obj });
                }
                // Create JWT
                const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24
                });
                // Return token
                return res.status(201).json({
                    token
                });
            }
        );
    });
});

module.exports = router;
