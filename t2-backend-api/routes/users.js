var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/users');

/* GET users listing. */

router.route('/')
    .get((req, res, next) => {
        User.find({})
        
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

    // router.route('/:id')
    // .get((req, res, next) => {
    //     User.findById(req.params.id)
    //         .then((user) => {
    //             res.statusCode = 200;
    //             res.setHeader('Content-Type', 'application/json');
    //             res.json(user);
    //         }, (err) => next(err))
    //         .catch((err) => next(err));
    // });
  //   router.route('/profile/:userid')
  //   .get((req, res, next) => {
  //     // console.log(req.user);
  //     User.findById(req.params.userid)
  //           .then((user) => {
  //               if (user != null) {
  //                   res.statusCode = 200;
  //                   res.setHeader('Content-Type', 'application/json');
  //                   res.json(user);
  //               }
  //               else {
  //                   err = new Error('User ' + req.user._id + ' not found');
  //                   err.status = 404;
  //                   return next(err);
  //               }
  //           }, (err) => next(err))
  //           .catch((err) => next(err));
  //   })

  //   .put((req, res, next) => {
  //     const data = req.body; 
  //     User.findByIdAndUpdate(req.params.userid, { $set: data }, { new: true, useFindAndModify: false })
  //         .then((user) => {                res.statusCode = 200;
  //             res.setHeader('Content-Type', 'application/json');
  //             res.json(user);
  //         }, (err) => next(err))
  //         .catch((err) => next(err));
  // });

  router.route('/profile')
  .get((req, res, next) => {
    // console.log(req.user);
    User.findById(req.user._id)
          .then((user) => {
              if (user != null) {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(user);
              }
              else {
                  err = new Error('User ' + req.user._id + ' not found');
                  err.status = 404;
                  return next(err);
              }
          }, (err) => next(err))
          .catch((err) => next(err));
  })

  .put((req, res, next) => {
    const data = req.body; 
    User.findByIdAndUpdate(req.user._id, { $set: data }, { new: true, useFindAndModify: false })
        .then((user) => {                res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.post('/signup', (req, res, next) => {
  User.register(new User(req.body),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, status: 'Registration Successful!' });
        });
      }
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, status: 'You are successfully logged in!', usertype: req.user.admin, userid: req.user._id });
});

router.get('/logout', (req, res, next) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.send("logout");
  } else {
    let err = new Errcor('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;

