const router = require('express').Router();
const Program = require('../../models/Program');
const Review = require('../../models/Review');

/* --- POST(add) a review to a program in db --- */
router.post('/', (req, res) => {
    Program.findById(req.body.programId).exec((err, program) => {
        // No program of this Id found, or db error
        if (err) {
            return res.status(422).json({ errors: err });
        }
        let newReview = req.body.userId
            ? new Review({
                  userId: req.body.userId,
                  review: req.body.review
              })
            : new Review({
                  review: req.body.review
              });

        program.addReview(newReview);
        newReview.save(err => {
            if (err) {
                return res.status(422).json({ errors: err });
            }
            program.save(err => {
                if (err) {
                    return res.status(422).json({ errors: err });
                }
                return res.status(201).json({ msg: 'Review successfully added to program' });
            });
        });
    });
});

module.exports = router;
