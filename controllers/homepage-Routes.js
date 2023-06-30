const router = require('express').Router();
const { User } = require('../models');
const initialize = require('../utils/initialize');

router.get('/', initialize, async (req, res) =>{
  // !!! Karina, please enter the name of the handlebar for the 'homepage' in the parenthesis of `res.render()`. Delete comment when you are done.
  res.render()
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login', {title: 'Test'});
});

module.exports = router;