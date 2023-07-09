const router = require('express').Router();
const { User } = require('../models');
const initialize = require('../utils/initialize');
const checkAuthenticated = require('../utils/checkAuth')
const checkNotAuthenticated = require('../utils/checkAuth')

router.get('/', checkAuthenticated, checkNotAuthenticated, async (req, res) =>{
  res.render('jobs')
})

router.get('/login', (req, res) => {
    res.render('jobs');
});

module.exports = router;

// !!! TESTING PURPOSES ONLY !!!
// !!! THIS LOGIN ROUTE WILL BE REPLACED IN THE FUTURE !!!