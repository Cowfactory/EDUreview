const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

// Initialize the Express server
const app = express();

// Set up favicon and static directories
app.use(favicon(path.join(__dirname, 'client', 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'client', 'build')));



// TODO #1 : add database

// TODO #2 : add api endpoint
app.use('/api/?', (req, res) => {
    //do something with the data from the form
});

// Catch-all route - Send react app
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = server;