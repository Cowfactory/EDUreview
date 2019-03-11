const router = require('express').Router();
const Review = require('../../models/Review');

// /* --- POST(add) a review to a program in db --- */
// router.post('/:id/reviews', (req, res) => {
//     Program.findById(req.params.id)
//         .populate('reviews')
//         .exec((err, program) => {
//             if (err) {
//                 return res.status(422).json({ errors: err });
//             }
//             console.log('no err in post');
//             program.addReview(req.body.review, req.body.userId);
//             program.save(err => {
//                 console.log('saving program maybe');
//                 if (err) {
//                     console.log('err');
//                     return res.status(422).json({ errors: err });
//                 }
//                 return res.status(201).json({ msg: 'Review successfully added to program' });
//             });
//         });
// });

router.post('/', (req, res) => {
    
});

module.exports = router;
