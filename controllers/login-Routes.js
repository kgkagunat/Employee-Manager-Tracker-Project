const router = require('express').Router();
const { User } = require('../../models');
const passport = require('passport');

// Login Route
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

// Logout Route
router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

// Sign up Route
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;