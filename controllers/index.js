const router = require('express').Router();             // Import Router Express

const apiRoutes = require('./api');                     // Import `API` Routes Folder (contains all API routes)
const loginRoutes = require('./login-Routes')           // Import `Login` Routes
const homeRoutes = require('./homepage-Routes');        // Import `Homepage` Routes

router.use('/', loginRoutes);                           // Pathing `loginRoutes` => /login
router.use('/homepage', homeRoutes);                    // Pathing `homeRoutes` => /homepage
router.use('/api', apiRoutes);                          // Pathing `apiRoutes` => /api      

module.exports = router;                                // Export `router`