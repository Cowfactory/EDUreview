const router = require('express').Router();
const Program = require('../../models/Program');

/* --- Adds a new program to db --- */
router.post('/', (req, res) => {
    const { programName, programTypes, institutionId } = req.body;

    const program = new Program({
        name: req.body.programName,
        types: req.body.programTypes,
        institutionId
    });

    program.updateCorrespondingInstitution(req.body.institutionId);

    program.save(err => {
        if (err) {
            return res.status(422).json({ errors: err });
        }

        return res.status(201).json({
            programId: program._id,
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
        Program.find({})
            .populate('institutionId')
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
            const ret = {
                results: results[0],
                count: results[1]
            }
            if (results[0].length !== 0) {
                ret.institution = results[0][0].institutionId;
            }

            return res.status(200).json(ret);
        })
        .catch(err => {
            console.log(err);
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
