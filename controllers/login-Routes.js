const router = require('express').Router();
const passport = require('passport');
const { checkNotAuthenticated } = require('../utils/checkAuth');

router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('login');
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.delete('/logout', (req, res) => {
  req.logout();
  req.session.destroy(err => {
    if (err) {
      res.json({ success: false, message: 'Failed to logout' });
    } else {
      res.clearCookie('connect.sid');
      res.json({ success: true });
    }
  });
});

module.exports = router;
