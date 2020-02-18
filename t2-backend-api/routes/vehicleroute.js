var express =require('express');
var router=express.Router();
var VehicleRoute = require('../model/vehicleroute');

//example
router.route('/')
    .get((req, res, next) => {
        VehicleRoute.find({})
        
            .then((vehroute) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vehroute);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        VehicleRoute.create(req.body)
            .then((vroute) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vroute);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
    router.route('/:id')
    .get((req, res, next) => {
        VehicleRoute.findById(req.params.id)
         .populate('stop')
            .then((vehroute) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vehroute);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        const data = req.body; 
        VehicleRoute.findByIdAndUpdate(req.params.id, { $set: data }, { new: true, useFindAndModify: false })
            .then((vroute) => {                res.statusCode = 200;
                
                res.setHeader('Content-Type', 'application/json');
                res.json(vroute);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        VehicleRoute.findByIdAndDelete(req.params.id)
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

    router.route('/:id/stops')
    .get((req, res, next) => {
        VehicleRoute.findById(req.params.id)
        .populate('stop')
            .then((vehroute) => {
                if (vehroute != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(vehroute.stop);
                }
                else {
                    err = new Error('Stops ' + req.params.id + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        VehicleRoute.findById(req.params.id)
            .then((vroute) => {
                if (vroute != null) {
                    vroute.stop.push(req.body);
                    vroute.save()
                        .then((vroute) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(vroute);
                        }, (err) => next(err));
                } else {
                    err = new Error('Stop ' + req.params.id + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });
    
    router.route('/:routename/search')
    .get((req, res, next) => {
        VehicleRoute.find({ routename: req.params.routename })
        
            .then((vroute) => {
                if (vroute != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(vroute);
                }
                else {
                    err = new Error('Route ' + req.params.routename + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })


module.exports=router;