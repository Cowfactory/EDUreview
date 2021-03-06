const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
require('dotenv').config();

/*
 * passport-local
 */
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, cb) => {
            return User.findOne({ email, password })
                .then(user => {
                    if (!user) {
                        return cb(null, false, {
                            message: 'Email or password is invalid.'
                        });
                    }
                    return cb(null, user, {
                        message: `${user.username} Logged In Successfully.`
                    });
                })
                .catch(err => cb(err));
        }
    )
);

/**
 * This middleware extracts JWT from header if present, and passes the corresponding User
 * to the next middelware
 */
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        (jwtPayload, cb) => {
            return User.findOneById(jwtPayload.id)
                .then(user => {
                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    )
);
