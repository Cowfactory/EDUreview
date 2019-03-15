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
        if (err) {
            return res.status(422).send({ errors: err });
        }
        return res.status(201).send({
            msg: 'Institution Entry Added'
        });
    });
});

/* --- Find institutions matching query string --- */
router.post('/search', (req, res, next) => {
    // Construct filter string w/ appropriate keys
    let q;
    if (req.body.stateFilter) {
        q = { $text: { $search: req.body.query }, state: req.body.stateFilter };
    } else {
        q = { $text: { $search: req.body.query } };
    }

    // Also sending back the total matching document as count
    Institution.countDocuments(q, (err, count) => {
        Institution.find().query({
            filter: q,
            limit: req.body.show,
            skip: req.body.skip,
            sort: req.body.ascending,
        }).exec(function (err, results) {
            if (err) {
                return res.status(422).send({ errors: err });
            }
            return res.status(200).send(JSON.stringify({
                results,
                count
            }))
        })
    })


});

/* --- GET all institutions from db --- */
router.get('/', (req, res) => {
    Institution.find().query({
        skip: req.body.skip
    }).exec((err, institutions) => {
        if (err) {
            return res.status(500).send({ errors: err });
        }
        return res.status(200).send(JSON.stringify(institutions));
    });
});

/* --- GET one institution from db --- */
router.get('/:id', (req, res) => {
    Institution.findById(req.params.id)
        .populate('programs')
        .exec((err, institution) => {
            if (err) {
                return res.status(500).send({ errors: err });
            }
            return res.status(200).send(JSON.stringify(institution));
        });
});

module.exports = router;
