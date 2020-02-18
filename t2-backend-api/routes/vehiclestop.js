var express =require('express');
var router=express.Router();
var Stop = require('../model/vehiclestop');

//example
router.route('/')
    .get((req, res, next) => {
        Stop.find({})
            .then((vehstop) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vehstop);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Stop.create(req.body)
            .then((vstop) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vstop);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    .delete((req, res, next) => {
        Stop.deleteMany({})
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


    router.route('/:id')
    .get((req, res, next) => {
        Stop.findById(req.params.id)
            .then((vstop) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vstop);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    .put((req, res, next) => {
        const data = req.body; 
        Stop.findByIdAndUpdate(req.params.id, { $set: data }, { new: true, useFindAndModify: false })
            .then((vstop) => {                res.statusCode = 200;
                
                res.setHeader('Content-Type', 'application/json');
                res.json(vstop);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Stop.findByIdAndDelete(req.params.id)
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

//end of an example


module.exports=router;