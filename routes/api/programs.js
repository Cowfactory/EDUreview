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
    // If theres a query string, search for matches
    if (req.body.query !== null) {
        // q is the key for the query string query
        Program.find({
            $text: { $search: req.body.query }
        })
            .then(results => {
                res.status(200).json(results);
            })
            .catch(err => {
                res.status(422).json(err);
            });
    }
    // Otherwise, search query is empty -> return nothing
    else {
        const response = {
            msg: 'bad query'
        };
        res.status(400).json(response);
    }
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
