const router = require('express').Router();
const { Department } = require('../../models');

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
        const departmentData = await Department.update(req.body, {
            where: {id: req.params.id,},
        });

        if (!departmentData[0]) { // departmentData returns an array where the first element is the number of affected rows
            res.status(404).json({ message: 'No department found with this id!' });
            return;
        };

        // Find the updated department
        const updatedDepartment = await Department.findByPk(req.params.id);

        res.status(200).json(updatedDepartment);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// DELETE a Department by id
router.delete('/:id', async (req, res) => {
    try {
        // Find the department that is about to be deleted
        const departmentToDelete = await Department.findByPk(req.params.id);

        const departmentData = await Department.destroy({
            where: {id: req.params.id,},
        });

        if (!departmentData) { // departmentData is the number of rows affected
            res.status(404).json({ message: 'No department found with this id!' });
            return;
        };

        res.status(200).json(departmentToDelete);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

module.exports = router;