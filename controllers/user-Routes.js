const router = require('express').Router();
const passport = require('passport');
const { User } = require('../models/User');
const { checkAuthenticated } = require('../utils/checkAuth');

// Get the user's profile information
router.get('/profile', checkAuthenticated, async (req, res) => {
  try {
    const userData = await User.findByPk(req.user.id);
    const user = userData.get({ plain: true });
    res.render('profile', { user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update the user's profile information
router.put('/profile', checkAuthenticated, async (req, res) => {
  try {
    await User.update(req.body, {
      where: { id: req.user.id },
    });
    res.redirect('/profile');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
