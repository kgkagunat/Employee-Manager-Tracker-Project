const router = require('express').Router();
const { User } = require('../models');
const initialize = require('../utils/initialize');


// !!! This GET route is for testing only. !!!
router.get('/test', (req, res) => {
  res.send('Homepage Test');
});

router.get('/', initialize, async (req, res) =>{
  
  res.render('homepage')
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login', {title: 'Test'});
});

module.exports = router;