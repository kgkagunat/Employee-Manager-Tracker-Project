const router = require('express').Router();
const { User } = require('../models');
const { checkAuthenticated } = require('../utils/checkAuth')
// const initialize = require('../utils/initialize');
// const checkNotAuthenticated = require('../utils/checkAuth')

router.get('/', checkAuthenticated, async (req, res) =>{
  res.render('homepage')
})

module.exports = router;