const router = require('express').Router();
const Institution = require('../../models/Institution');

/* --- Adds a new institution to db --- */
router.post('/', (req, res) => {
    let institution = new Institution({
        name: req.body.name,
        website: req.body.websiteURL
    })
    institution.save(err => {
        if(err) return err;
        res.status(201).send({
            msg: "Institution Entry Added"
        })
    })
});

/* --- Gets all institutions from db --- */
router.get('/', (req, res) => {
    Institution.find({}, (err, result) => {
        if(err) {
            res.status(500).send({
                msg: "Internal Error"
            })
            return err;
        }
        res.status(200).send(JSON.stringify(result));
    });  
});

/* --- Gets one institution from db --- */
router.get('/:id', (req, res) => {
    Institution.findById(req.params.id).populate()
        .exec((err, result) => {
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