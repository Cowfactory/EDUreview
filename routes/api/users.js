const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            return res.status(200).json(user.toObject());
        })
        .catch(err => {
            return res.status(422).json({ errors: ['Error searching for user names'] });
        });
});

/* --- Adds a new user to db --- */
router.post('/', (req, res, next) => {
    if (!req.body.email) {
        return res.status(422).json({ errors: ['Email field is required'] });
    }
    if (!req.body.username) {
        return res.status(422).json({ errors: ['Username field is required'] });
    }
    if (!req.body.password) {
        return res.status(422).json({ errors: ['Password field is required'] });
    }

    // See if the email is already in the DB
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            // Email is already in the DB. Alert the user.
            return res.status(422).json({ errors: ['Email already in use'] });
        }
        if (err) {
            return res.status(422).json({ errors: ['Error in database lookup'] });
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
                    // Return only the err message to user
                    let arr = [];
                    for (key of Object.keys(err.errors)) {
                        arr.push(err.errors[key].message);
                    }
                    return res.status(422).json({ errors: arr });
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
