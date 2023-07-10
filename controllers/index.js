const router = require('express').Router();        
const apiRoutes = require('./api');                    
const loginRoutes = require('./login-Routes');          
const homeRoutes = require('./homepage-Routes');       

router.use('/login', loginRoutes); 
router.use('/', homeRoutes);
router.use('/api', apiRoutes);                               

module.exports = router;
