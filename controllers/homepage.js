const router = require('express').Router();
const { User } = require('../models');
const initialize = require('../utils/initialize');

router.get('/', initialize, async (req, res) =>{

})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

module.exports = router;