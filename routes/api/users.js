const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

router.get('/:id', (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user.toObject()))
        .catch(err => {
            return res.status(500).json({
                errors: {
                    generic: err
                }
            });
        });
});

/* --- Adds a new user to db --- */
router.post('/', async (req, res, next) => {
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
        return res.status(400).json(errObj);
    }

    // Find if email already in use
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(422).json({
                errors: {
                    email: 'Email already in use'
                }
            });
        }
    } catch (err) {
        return res.status(500).json({
            errors: {
                generic: 'Error in database lookup'
            }
        });
    }

    // Email is available, create the user in the DB
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(user => {
            // Create JWT
            const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            });
            // Return token
            return res.status(201).json({
                token
            });
        })
        .catch(err => {
            // Extract the err message and json to user
            const obj = {};
            for (const key of Object.keys(err.errors)) {
                obj[key] = err.errors[key].message;
            }
            return res.status(422).json({ errors: obj });
        });
});

module.exports = router;
