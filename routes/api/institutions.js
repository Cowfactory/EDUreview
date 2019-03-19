const router = require('express').Router();
const Institution = require('../../models/Institution');

/**
 * @description
 * Add an Institution to db.
 * @param {String}  req.body.name   Name of the Institution
 * @param {String}  req.body.address    Address of the Institution
 * @param {String[]} req.body.cities    List of Cities
 * @param {String} req.body.telephone   Telephone number
 * @param {String}  req.body.websiteURL Website URL
 */
router.post('/', async (req, res) => {
    const { name, address, cities, state, telephone, websiteURL } = req.body;

    if (!name) {
        return res.status(400).json({ errors: 'Name field is empty' });
    }

    const institution = new Institution({
        name,
        address,
        cities,
        state,
        telephone,
        website: websiteURL
    });

    institution
        .save()
        .then(() => {
            return res.status(201).json({ msg: 'Institution Entry Added' });
        })
        .catch(err => {
            return res.status(422).json({ errors: err });
        });
});

/**
 * @description
 * Find a subset of institutions according to parameters.
 * Also sends back the total # of matching documents as count.
 * @param {String}  req.body.query  The find() query string
 * @param {String}  [req.body.show=10]   Num results to show. Default shows 10
 * @param {String}  [req.body.skip=0]    First {skip} results to skip. Default skips 0
 * @param {Number}  [req.body.sort=1]    Returns results in: 1: Ascending -1: Descending order. Default Ascending
 * @param {Number}  [req.body.selectFields='name']    Select which fields to return. Default only returns name
 * @param {String}  [req.body.stateCode]   Filter results by stateCode
 * @return {Object} Return object has results key, which holds a number of matching institutions,
 *                  and count key, which hold the total number of matches
 */
router.post('/search', (req, res, next) => {
    const { query, show, skip, ascending, selectFields, stateCode } = req.body;

    if (!query) {
        return res.status(400).json({ errors: 'Search query is empty!' });
    }

    const filter = { $text: { $search: query } };
    const stateCodeFilter = stateCode || [null, /.*/];

    Promise.all([
        Institution.find()
            .query({
                filter,
                limit: show,
                skip,
                sort: ascending,
                stateCode,
                selectFields
            })
            .exec(),
        Institution.countDocuments(filter)
            .where('state')
            .in(stateCodeFilter)
            .exec()
    ])
        .then(results => {
            return res.status(200).json({
                results: results[0],
                count: results[1]
            });
        })
        .catch(err => {
            return res.status(422).json({ errors: err });
        });
});

/**
 * @description
 * Returns all institutions from db
 * TODO - come back and implement queryString count+skip
 */
router.get('/', (req, res) => {
    Institution.find()
        .query({})
        .then(institutions => {
            return res.status(200).json(institutions);
        })
        .catch(err => {
            return res.status(500).json({ errors: err });
        });
});

/**
 * @description
 * Returns one institution from db by ID selection
 */
router.get('/:id', (req, res) => {
    const { fields } = req.query //ToDo - implement field selector
    Institution.findById(req.params.id)
        .populate('programs')
        .then(institution => {
            return res.status(200).json(institution);
        })
        .catch(err => {
            return res.status(500).json({ errors: err });
        });
});

module.exports = router;
