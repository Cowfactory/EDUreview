const router = require('express').Router();
const Review = require('../../models/Review');

/* --- Adds a new review to db --- */
router.post('/', (req, res) => {
    let review = new Review({
        programId: req.body.programId,
        userId: null, //ToDo: add user ID
        review: req.body.review
    })
    review.save(err => {
        if(err) {
            res.status(500).send({
                msg: "Internal Error"
            })
            return err;
        }
        res.status(201).send({
            msg: "Institution Entry Added"
        })
    });
});

/* --- Gets all reviews from db --- */
router.get('/', (req, res) => {
    // if pid is undefined - ie. there is no query string, db search will return all reviews
    let pid = req.query.pid;
    Review.find({ programId: pid }, (err, result) => {
        if(err) {
            res.status(500).send({
                msg: "Internal Error"
            })
            return err;
        }
        res.status(200).send(JSON.stringify(result));
    }); 
});

module.exports = router;