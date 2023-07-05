const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Login route');
});

module.exports = router;


// !!! TESTING PURPOSES ONLY !!!
// !!! THIS LOGIN ROUTE WILL BE REPLACED IN THE FUTURE !!!