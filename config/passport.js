const passport = require("passport");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require("dotenv").config();

/*
 * passport-local
 */
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        function(email, password, cb) {
            return User.findOne({ email, password })
                .then(user => {
                    if (!user) {
                        return cb(null, false, {
                            message: "Email or password is invalid."
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
        function(jwtPayload, cb) {
            //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
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
