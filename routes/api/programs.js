const router = require('express').Router();
const Program = require('../../models/Program');

/* --- Adds a new program to db --- */
router.post('/', (req, res) => {
    var program = new Program({
        name: req.body.programName,
        types: req.body.programTypes,
        locations: req.body.programLocations
    })
    program.updateCorrespondingInstitution(req.body.selectedInstitutionId);
    
    program.save(err => {
        if(err) return err;
        res.status(201).send({
            msg: "Program Entry Added"
        })
    })
});

/* --- GET programs matching query string --- */
router.get('/search', (req, res, next) => {
    // If theres a query string, search for matches
    if(req.query.q !== null) { //q is the key for the query string query
        Program.find({
            $text: { $search: req.query.q}
        })
        .then(results => {
            res.status(200).send(JSON.stringify(results))
        })
        .catch(err => {
            // no op
        });
    }
    // Otherwise, search query is empty -> return nothing
    else {
        let response = {
            msg: "bad query"
        }
        res.status(400).send(JSON.stringify(response));
    }
});

/* --- GET all programs from db --- */
router.get('/', (req, res) => {
    Program.find({}, (err, result) => {
        if(err) {
            res.status(500).send({
                msg: "Internal Error"
            })
            return err;
        }
        res.status(200).send(JSON.stringify(result));
    });  
});

/* --- GET one program from db --- */
router.get('/:id', (req, res) => {
    Program.findById(req.params.id).populate('reviews')
        .exec((err, program) => {
            if(err) {
                res.status(500).send({
                    msg: "Internal Error"
                })
                return err;
            }
            res.status(200).send(JSON.stringify(program));
        });
});

/* --- POST(add) a review to a program in db --- */
router.post('/:id/reviews', (req, res) => {
    Program.findById(req.params.id)
        .populate()
        .exec((err, program) => {  
            program.addReview(req.body.review);
            // console.log(program.reviews);  

            // let arr = program.reviews;
            // arr.push(req.body.review);  
            // program.reviews = arr;

            // console.log(program.reviews);  

            program.save(err => {
                res.status(200).send(JSON.stringify(program));
            })
        })  
})

module.exports = router;