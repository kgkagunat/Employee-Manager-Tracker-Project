const router = require('express').Router();                 // Import Router Express

const departmentRoutes = require('./department-Routes');    // Import `Department` Routes
const jobsRoutes = require('./jobs-Routes');                // Import `Jobs` Routes
const employeeRoutes = require('./employee-Routes');        // Import `Employee` Routes

router.use('/departments', departmentRoutes);               // Path `departmentRoutes` => /departments
router.use('/jobs', jobsRoutes);                            // Path `jobsRoutes` => /jobs
router.use('/employees', employeeRoutes);                   // Path `employeeRoutes` => /employees 

module.exports = router;                                    // Export `router`
