const router = require('express').Router();
const { Department, Jobs, Employee } = require('../../models');


// Route to render 'create-employee' view
router.get('/create', async (req, res) => {
    console.log('Hit /create route');
    try {
        const departmentData = await Department.findAll();
        const departments = departmentData.map((department) => department.get({ plain: true }));

        const jobData = await Jobs.findAll();
        const jobs = jobData.map((job) => job.get({ plain: true }));

        res.render('create-employee', { departments, jobs });
    } catch (err) {
        res.status(500).json(err);
    };
});


// GET employee details by id
router.get('/:id', async (req, res) => {
    try {
        const employeeData = await Employee.findByPk(req.params.id, {
            include: [Department, Jobs] // Include related department and job info
        });

        if (!employeeData) {
            res.status(404).json({ message: 'No employee found with this id!' });
            return;
        }

        const employee = employeeData.get({ plain: true });

        const departmentData = await Department.findAll();
        const departments = departmentData.map((department) => department.get({ plain: true }));

        const jobData = await Jobs.findAll();
        const jobs = jobData.map((job) => job.get({ plain: true }));

        res.render('employee', { employee, departments, jobs });
    } catch (err) {
        res.status(500).json(err);
    }
});


// POST a new employee
router.post('/', async (req, res) => {
    try {
        const newEmployee = await Employee.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            // employee_title: req.body.title,
            employee_manager: req.body.employee_manager,
            job_id: req.body.job_id,
            department_id: req.body.department_id
        });

        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(500).json(err);
    };
});


// PUT update an employee by id
router.put('/:id', async (req, res) => {
    try {
        const employeeData = await Employee.update(req.body, {
            where: {id: req.params.id},
        });

        if (!employeeData) {
            res.status(404).json({ message: 'No employee found with this id!' });
            return;
        };

        res.redirect('/employees');
    } catch (err) {
        res.status(500).json(err);
    };
});


// DELETE an employee by id
router.delete('/:id', async (req, res) => {
    try {
        const employeeToDelete = await Employee.findByPk(req.params.id);

        if (!employeeToDelete) {
            res.status(404).json({ message: 'No employee found with this id!' });
            return;
        };

        await Employee.destroy({
            where: {id: req.params.id},
        });

        res.redirect('/employees');
    } catch (err) {
        res.status(500).json(err);
    };
});



module.exports = router;