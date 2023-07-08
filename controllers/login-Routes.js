const router = require('express').Router();
const passport = require('passport');
const { checkNotAuthenticated } = require('../utils/checkAuth');
const { User } = require('../models/User');

// User Registration
router.post('/register', async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Missing name, email or password" });
    }

    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login Page
router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login');
});

// User Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

// User Logout
router.get('/logout', (req, res) => {
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
