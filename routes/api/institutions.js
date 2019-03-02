const router = require('express').Router();
const Institution = require('../../models/Institution');

/* --- POST(add) a new institution to db --- */
router.post('/', (req, res) => {
    const institution = new Institution({
        name: req.body.name,
        website: req.body.websiteURL
    });
    institution.save(err => {
        if (err) return err;
        res.status(201).send({
            msg: 'Institution Entry Added'
        });
    });
});

/* --- GET institutions matching query string --- */
router.get('/search', (req, res, next) => {
    // If theres a query string, search for matches
    if (req.query.q !== null) {
        // q is the key for the query string query
        Institution.find({
            $text: { $search: req.query.q }
        })
            .then(results => {
                res.status(200).send(JSON.stringify(results));
            })
            .catch(err => {
                // no op
            });
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
    Institution.find({}, (err, result) => {
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
