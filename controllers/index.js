const router = require('express').Router();        

const apiRoutes = require('./api');                    
const loginRoutes = require('./login-Routes')          
const homeRoutes = require('./homepage-Routes');       

router.use('/', loginRoutes);                           
router.use('/homepage', homeRoutes);                    
router.use('/api', apiRoutes);                               

module.exports = router;                                