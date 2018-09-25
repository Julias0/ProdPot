var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');

let guardMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/loginPage', function (req, res, next) {
  res.render('login');
});

router.get('/signUpPage', function (req, res, next) {
  res.render('signUp');
});


module.exports = router;
