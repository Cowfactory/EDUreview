const papa = require('papaparse');
const fs = require('fs');
const file = fs.createReadStream('./seed/colleges_2016_03.csv');
const Institution = require('../models/Institution');

require('dotenv').config()
// Init db connection
db = require('../config/db');

db.once('open', function seed() {
    let count = 0;
    let arr = [];
    papa.parse(file, {
        step: csvRow => {
            const data = csvRow.data[0];
            arr.push(new Institution({
                name: data[1],
                address: data[2],
                city: data[3],
                state: data[4],
                country: data[6],
                telephone: data[8],
                website: data[11]
            }));
            count++;
        },
        complete: (results, file) => {
            console.log('Parsing complete. Read', count, 'records.');
            Institution.collection.insertMany(arr, onInsert);
        }
    });

    function onInsert(err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Database batch insert successful");
            console.log("Exiting...");
            return process.exit(0);
        }

    }
});