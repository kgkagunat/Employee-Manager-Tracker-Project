const router = require('express').Router();
const { User } = require('../models');
const initialize = require('../utils/initialize');
const checkAuthenticated = require('../utils/checkAuth')
const checkNotAuthenticated = require('../utils/checkAuth')

router.get('/', checkAuthenticated, checkNotAuthenticated, async (req, res) =>{
  res.render('homepage')
})

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;