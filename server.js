const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const passport = require('passport');

// Get env variables
require('dotenv').config();

// Init db connection
require('./config/db');

// Initialize the Express server
const app = express();

// Logger
app.use(logger('dev'));

// Configure express' body-parser to parse into req.body; body, url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up favicon and static directories
app.use(favicon(path.join(__dirname, 'client', 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'client', 'build')));

// JWT auth
require('./config/passport');

// API routes
app.use('/api/programs/', require('./routes/api/programs'));
app.use('/api/institutions', require('./routes/api/institutions'));
app.use('/api/users', require('./routes/api/users'));
// Auth routes
app.use('/api/auth', require('./routes/api/auth'));

// Protected profile route
app.use('/profile', passport.authenticate('jwt', { session: false }), require('./routes/profile'));

// Catch-all route - Send react app
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = server;
