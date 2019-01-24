const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// Init db connection
require('./config/db');

// Initialize the Express server
const app = express();

// Logger
app.use(logger('dev'));

// Configure express' body-parser to parse into req.body; body, url  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up favicon and static directories
app.use(favicon(path.join(__dirname, 'client', 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Initialize Express Route
// const router = express.Router();

// TODO - abstract db logic to separate files
var mongoose = require('mongoose');
var Review = require('./models/Review');

// TODO #2 : add api endpoint
app.post('/api/reviews', (req, res) => {
    console.log("we're at the reviews endpoint");
    console.log(req.body.textValue);

    // Add a new review to the db
    let review = new Review({
        review: req.body.textValue
    })
    review.save();
    res.send("ok");
});

app.get('/api/reviews', (req, res) => {
    let allReviews;
    Review.find({}, function(err, result){
        allReviews = result;
        res.send(JSON.stringify(allReviews));
    });  
});

// Catch-all route - Send react app
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = server;