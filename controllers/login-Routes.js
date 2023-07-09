const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/User');

// Hardcoded user data
const user = {
    id: 1,
    email: 'JohnDoe@test.com',
    password: bcrypt.hashSync('test1234', 10)
};

router.get('/', (req, res) => {
    res.render('login');
});

// Login route
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (email !== user.email || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Save the user in session
    req.session.user = {
        id: user.id,
        email: user.email
    };

    return res.status(200).json({ message: 'Logged in successfully.' });
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out, please try again.' });
        } else {
            return res.status(200).json({ message: 'Logged out successfully.' });
        }
    });
});

module.exports = router;
