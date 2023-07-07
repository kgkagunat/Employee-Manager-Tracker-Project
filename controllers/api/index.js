const router = require('express').Router();                 

const departmentRoutes = require('./department-Routes');   
const jobsRoutes = require('./jobs-Routes');               
const employeeRoute = require('./employee-Routes');       

router.use('/departments', departmentRoutes);               
router.use('/jobs', jobsRoutes);                            
router.use('/employees', employeeRoute);                   

module.exports = router;                                    
