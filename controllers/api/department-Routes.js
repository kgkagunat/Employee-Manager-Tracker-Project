const router = require('express').Router();
const { Department, Jobs, Employee } = require('../../models');

//===========================================================================

// GET All Departments
router.get('/', async (req, res) => {
    try {
        const departmentData = await Department.findAll();
        res.status(200).json(departmentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// GET a single Department by id
router.get('/:id', async (req, res) => {
    try {
        const departmentData = await Department.findByPk(req.params.id);
        res.status(200).json(departmentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// POST a new Department
router.post('/', async (req, res) => {
    try {
        const departmentData = await Department.create(req.body);
        res.status(200).json(departmentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// PUT update a Department by id
router.put('/:id', async (req, res) => {
    try {
        const [numberOfAffectedRows, affectedRows] = await Department.update(req.body, {
            where: {id: req.params.id},
            returning: true,                             
        });

        if (numberOfAffectedRows === 0) {
            res.status(404).json({ message: 'No department found with this id!' });
            return;
        };

        res.status(200).json(affectedRows);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// DELETE a Department by id (re-assign jobs & employees to Unassigned Department)
router.delete('/:id', async (req, res) => {
    try {
        const departmentToDelete = await Department.findByPk(req.params.id);    // Fetch the `Department` model. Stores data in the `departmentToDelete` TEMPORARILY for only this function router.delete(). Once function ends, `departmentToDelete` will be garbaged.
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

        res.status(200).json({ message: `Department '${departmentToDelete.department_name}' has been deleted!` });
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

module.exports = router;