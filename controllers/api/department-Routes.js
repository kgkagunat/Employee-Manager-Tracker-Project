const router = require('express').Router();
const { Department, Jobs, Employee } = require('../../models');
const { checkAuthenticated } = require('../../utils/checkAuth');

//===========================================================================

// GET All Departments
router.get('/', checkAuthenticated, async (req, res) => {
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

//===========================================================================

// GET a single Department by id
router.get('/:id', checkAuthenticated, async (req, res) => {
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

//===========================================================================

// POST a new Department
router.post('/', checkAuthenticated, async (req, res) => {
    try {
        await Department.create(req.body);
        res.redirect('/departments');
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// PUT update a Department by id
router.put('/:id', checkAuthenticated, async (req, res) => {
    try {
        const departmentData = await Department.update(req.body, {
            where: {id: req.params.id},
        });

        if (!departmentData) {
            res.status(404).json({ message: 'No department found with this id!' });
            return;
        };

        res.redirect('/departments');
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// DELETE a Department by id (re-assign jobs & employees to Unassigned Department)
router.delete('/:id', checkAuthenticated, async (req, res) => {
    try {
        const departmentToDelete = await Department.findByPk(req.params.id);
        if (!departmentToDelete) {
            res.status(404).json({ message: 'No department found with this id!' });
            return;
        };

        // Fetch the `Unassigned Department`
        const unassignedDepartment = await Department.findOne({
            where: {department_name: 'Unassigned Department (DO NOT REMOVE)'}
        });
        if (!unassignedDepartment) {
            res.status(404).json({ message: 'No Unassigned Department found!' });
            return;
        };

        // Update jobs to Unassigned Department
        await Jobs.update({ department_id: unassignedDepartment.id }, {
            where: { department_id: departmentToDelete.id }
        });

        // Update employees to Unassigned Department
        await Employee.update({ department_id: unassignedDepartment.id }, {
            where: { department_id: departmentToDelete.id }
        });

        // Delete Department
        await Department.destroy({
            where: {id: req.params.id},
        });

        res.redirect('/departments');
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

module.exports = router;