const router = require('express').Router();
const Program = require('../../models/Program');

/* --- Adds a new program to db --- */
router.post('/', (req, res) => {
    const program = new Program({
        name: req.body.programName,
        types: req.body.programTypes
    });
    program.updateCorrespondingInstitution(req.body.institutionId);

    program.save(err => {
        if (err) {
            return res.status(422).json({ errors: err });
        }

        return res.status(201).json({
            msg: 'Program Entry Added'
        });
    });
});

/* --- Find programs matching query string --- */
router.post('/search', (req, res, next) => {
    const { query, skip, show, ascending, selectFields } = req.body;
    if (!query) {
        return res.status(400).json({ errors: 'Search query is empty!' });
    }

    const filter = { $text: { $search: query } };

    Promise.all([
        Program.find()
            .query({
                filter,
                limit: show,
                skip,
                sort: ascending,
                selectFields
            })
            .exec(),
        Program.countDocuments(filter).exec()
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

/* --- GET all programs from db --- */
router.get('/', (req, res) => {
    Program.find({})
        .populate('reviews')
        .exec((err, result) => {
            if (err) {
                res.status(500).send({
                    msg: 'Internal Error'
                });
                return err;
            }
            return res.status(200).json(result);
        });
});

/* --- GET one program from db --- */
router.get('/:id', (req, res) => {
    Program.findById(req.params.id)
        .populate('reviews')
        .exec((err, program) => {
            if (err) {
                return res.status(422).send({ errors: err });
            }
            return res.status(200).json(program);
        });
});

module.exports = router;
