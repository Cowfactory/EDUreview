const router = require('express').Router();
const Institution = require('../../models/Institution');

/* --- POST(add) a new institution to db --- */
router.post('/', (req, res) => {
    const institution = new Institution({
        name: req.body.name,
        address: req.body.address,
        cities: req.body.cities,
        state: req.body.state,
        telephone: req.body.telephone,
        website: req.body.websiteURL,
    });
    institution.save(err => {
        if (err) return err;
        res.status(201).send({
            msg: 'Institution Entry Added'
        });
    });
});

/* --- Find institutions matching query string --- */
router.post('/search', (req, res, next) => {
    // If theres a query, search for matches
    if (req.body.query !== null) {
        // default limit is 10, unless specified in body
        let limit = req.body.show || 10;
        let stateFilter = req.body.stateFilter || new RegExp('\\.*');
        let countQuery = Institution.countDocuments({ $text: { $search: req.body.query }, state: stateFilter });
        Institution.find({ $text: { $search: req.body.query }, state: stateFilter }, null, {
            limit,
            skip: req.body.skip,
            sort: {
                name: 1
            }
        }, function (err, results) {
            if (err) {
                res.status(422).send(err);
            }
            countQuery.exec(function (err, count) {
                if (err) {
                    res.status(422).send(err);
                }
                let obj = {
                    results,
                    count
                }
                res.status(200).send(JSON.stringify(obj));
            })
        })
    }
    // Otherwise, search query is empty -> return nothing
    else {
        const response = {
            msg: 'bad query'
        };
        res.status(400).send(JSON.stringify(response));
    }
});

/* --- GET all institutions from db --- */
router.get('/', (req, res) => {
    Institution.find({}, null, {
        limit: 10,
        skip: req.body.skip,
        sort: {
            name: 1
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send({
                msg: 'Internal Error'
            });
            return err;
        }
        res.status(200).send(JSON.stringify(result));
    });
});

/* --- GET one institution from db --- */
router.get('/:id', (req, res) => {
    Institution.findById(req.params.id)
        .populate('programs')
        .exec((err, result) => {
            if (err) {
                res.status(500).send({
                    msg: 'Internal Error'
                });
                return err;
            }
            res.status(200).send(JSON.stringify(result));
        });
});

module.exports = router;
