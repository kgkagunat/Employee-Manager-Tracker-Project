const router = require('express').Router();
const { User, Department, Jobs, Employee } = require('../models');
const { checkAuthenticated } = require('../utils/checkAuth');

// New route for /homepage
router.get('/homepage', checkAuthenticated, async (req, res) =>{
  res.render('homepage');
})


// Existing route
router.get('/', checkAuthenticated, async (req, res) =>{
  res.render('homepage');
})


// GET All Departments
router.get('/departments', checkAuthenticated, async (req, res) => {
  try {
      const departmentData = await Department.findAll({
          include: [
              { 
                  model: Jobs,
                  include: [ Employee ] 
              }
          ]
      });

      const departments = departmentData.map((department) => department.get({ plain: true }));
      
      res.render('departments', { departments });
  } catch (err) {
      res.status(500).json(err);
  };
});


// GET a single Department by id
router.get('/departments/:id', checkAuthenticated, async (req, res) => {
  try {
      const departmentData = await Department.findByPk(req.params.id, {
          include: [
              { 
                  model: Jobs,
                  include: [ Employee ] 
              }
          ]
      });

      if (!departmentData) {
          res.status(404).json({ message: 'No department found with this id!' });
          return;
      }

      const department = departmentData.get({ plain: true });

      res.render('department', { department });
  } catch (err) {
      res.status(500).json(err);
  };
});


// GET all jobs
router.get('/jobs', checkAuthenticated, async (req, res) => {
    try {
        const jobsData = await Jobs.findAll({
            include: [
                {
                    model: Department,
                    attributes: ['id', 'department_name']
                }
            ]
        });

        const jobs = jobsData.map((job) => job.get({ plain: true }));

        res.render('jobs', { jobs });
    } catch (err) {
        res.status(500).json(err);
    };
});


// GET a single job by id
router.get('/jobs/:id', checkAuthenticated, async (req, res) => {
    try {
        const jobData = await Jobs.findByPk(req.params.id, {
            include: [
                {
                    model: Department,
                    attributes: ['id', 'department_name']
                }
            ]
        });

        if (!jobData) {
            res.status(404).json({ message: 'No job found with this id!' });
            return;
        }

        const job = jobData.get({ plain: true });

        const departmentData = await Department.findAll();
        const departments = departmentData.map((department) => department.get({ plain: true }));

        // Merge the job and departments into a single object before sending to the view
        const data = {
            ...job,
            departments
        }

        res.render('job', data);
    } catch (err) {
        res.status(500).json(err);
    };
});


// GET all employees
router.get('/employees', checkAuthenticated, async (req, res) => {
    try {
        const employeeData = await Employee.findAll({
            include: [
                {
                    model: Department,
                    attributes: ['id', 'department_name']
                },
                {
                    model: Jobs,
                    attributes: ['id', 'job_title']
                }
            ]
        });

        const employees = employeeData.map((employee) => employee.get({ plain: true }));

        res.render('employees', { employees });
    } catch (err) {
        res.status(500).json(err);
    };
});


// GET a single employee by id
router.get('/employees/:id', checkAuthenticated, async (req, res) => {
    try {
        const employeeData = await Employee.findByPk(req.params.id, {
            include: [
                {
                    model: Department,
                    attributes: ['id', 'department_name']
                },
                {
                    model: Jobs,
                    attributes: ['id', 'job_title']
                }
            ]
        });

        if (!employeeData) {
            res.status(404).json({ message: 'No employee found with this id!' });
            return;
        }

        const employee = employeeData.get({ plain: true });

        // Fetch all departments and jobs
        const departmentData = await Department.findAll();
        const departments = departmentData.map((department) => department.get({ plain: true }));

        const jobsData = await Jobs.findAll();
        const jobs = jobsData.map((job) => job.get({ plain: true }));

        // Merge employee, departments, and jobs data into a single object
        const data = {
            employee,
            departments,
            jobs
        };

        res.render('employee', data);
    } catch (err) {
        res.status(500).json(err);
    };
});


module.exports = router;