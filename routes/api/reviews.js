const router = require('express').Router();
const Program = require('../../models/Program');
const Review = require('../../models/Review');

/* --- POST(add) a review to a program in db --- */
router.post('/', (req, res) => {
    let newReview;
    if (req.body.user) {
        newReview = new Review({
            user: req.body.user,
            review: req.body.review
        });
    } else {
        newReview = new Review({
            review: req.body.review
        });
    }

    Program.findById(req.body.programId)
        .exec()
        .then(program => {
            return program.addReview(newReview);
        })
        .then(program => {
            console.log(program);
            newReview.save();
            program.save();
            return res.status(201).json({ msg: 'Review successfully added to program' });
        })
        .catch(err => {
            return res.status(422).json({ errors: err });
        });

    // (err, program) => {
    // // No program of this Id found, or db error
    // if (err) {
    //     return res.status(422).json({ errors: err });
    // }

    // let newReview;
    // if (req.body.user) {
    //     newReview = new Review({
    //         user: req.body.user,
    //         review: req.body.review
    //     });
    // } else {
    //     newReview = new Review({
    //         review: req.body.review
    //     });
    // }

    // program.addReview(newReview);
    // newReview.save(err => {
    //     if (err) {
    //         return res.status(422).json({ errors: err });
    //     }
    //     program.save(err => {
    //         if (err) {
    //             return res.status(422).json({ errors: err });
    //         }
    //         return res.status(201).json({ msg: 'Review successfully added to program' });
    //     });
    // });
    // });
});

router.get('/search', (req, res) => {
    if (!req.query.uid) {
        return res.status(400).json({ errors: 'Please specifiy a user ID' });
    }
    Review.find({ user: req.query.uid })
        .then(reviews => {
            return res.status(200).json(reviews);
        })
        .catch(err => {
            return res.status(422).json({ errors: err });
        });
});

router.get('/:id', (req, res) => {
    Review.findById(req.params.id)
        .populate({
            path: 'user',
            select: 'username'
        })
        .exec((err, review) => {
            const reviewNoPass = review.toObject();
            if (err) {
                return res.status(422).json({ errors: err });
            }
            return res.status(200).json(reviewNoPass);
        });
});
module.exports = router;
