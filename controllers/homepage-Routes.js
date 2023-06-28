const router = require('express').Router();
const { User } = require('../models');
const initialize = require('../utils/auth');

router.get('/', initialize, async (req, res) =>{
  // !!! KARINA, for the res.render() replace my placeholder text with the actual name of the handlebar. This is the homepage, so should just be 'homepage' or whatever the name of the handlebar for this is.
  // !!! KARINA, right below is the res.render(), uncomment the code so you can enter the handlebar name. Once entetred "DELETE" all my comments please. Thanks!
      res.render('KARINA => the name of the handlebar for the homepage goes in here. Replace this entire text/string')
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

module.exports = router;



