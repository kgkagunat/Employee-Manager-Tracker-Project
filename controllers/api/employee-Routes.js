const router = require('express').Router();
const { Department, Jobs, Employee  } = require('../../models');
const { checkAuthenticated } = require('../../utils/checkAuth');

//===========================================================================

// GET all employees
router.get('/', checkAuthenticated, async (req, res) => {
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

//===========================================================================

// GET a single employee by id
router.get('/:id', checkAuthenticated, async (req, res) => {
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

        res.render('employee', { employee });
    } catch (err) {
        res.status(500).json(err);
    };
});


//===========================================================================

// POST a new employee
router.post('/', checkAuthenticated, async (req, res) => {
    try {
        await Employee.create(req.body);
        res.redirect('/employees');
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// PUT update an employee by id
router.put('/:id', checkAuthenticated, async (req, res) => {
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

//===========================================================================

// DELETE an employee by id
router.delete('/:id', checkAuthenticated, async (req, res) => {
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

//===========================================================================

module.exports = router;