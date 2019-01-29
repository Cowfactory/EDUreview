const router = require('express').Router();
const Review = require('../../models/Review');

/* --- Adds a new review to db --- */
router.post('/', (req, res) => {
    let review = new Review({
        review: req.body.textValue
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
    Review.find({}, (err, result) => {
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