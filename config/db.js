const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});