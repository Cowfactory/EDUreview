const router = require('express').Router();
const Program = require('../../models/Program');

/* --- Adds a new program to db --- */
router.post('/', (req, res) => {
    let program = new Program({
        reviews: [],
        name: req.body.programName,
        types: req.body.programTypes,
        locations: req.body.programLocations
    })
    program.save(err => {
        if(err) return err;
        res.status(201).send({
            msg: "Program Entry Added"
        })
    })
});

/* --- Gets all programs from db --- */
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

/* --- Gets one program from db --- */
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

/* --- Add a review to a program in db --- */
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

// if(err) {
//     res.status(500).send({
//         msg: "Internal Error"
//     })
//     return err;
// }
module.exports = router;