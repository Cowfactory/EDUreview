const router = require('express').Router();
const Program = require('../../models/Program');

/* --- Adds a new program to db --- */
router.post('/', (req, res) => {
    let program = new Program({
        institutionName: req.body.programInstitutionName,
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
    Program.findById(req.params.id).exec((err, result) => {
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