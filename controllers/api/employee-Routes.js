const router = require('express').Router();
const { Employee } = require('../../models');

//===========================================================================

// GET all employees
router.get('/', async (req, res) => {
    try {
        const employeeData = await Employee.findAll();
        res.status(200).json(employeeData);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// GET a single employee by id
router.get('/:id', async (req, res) => {
    try {
        const employeeData = await Employee.findByPk(req.params.id);
        res.status(200).json(employeeData);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// POST a new employee
router.post('/', async (req, res) => {
    try {
        const employeeData = await Employee.create(req.body);
        res.status(200).json(employeeData);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// PUT update an employee by id
router.put('/:id', async (req, res) => {
    try {
        const [numberOfAffectedRows, affectedRows] = await Employee.update(req.body, {
            where: {id: req.params.id},
            returning: true,
        });

        if (numberOfAffectedRows === 0) {
            res.status(404).json({ message: 'No employee found with this id!' });
            return;
        };

        res.status(200).json(affectedRows);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// DELETE an employee by id
router.delete('/:id', async (req, res) => {
    try {
        const employeeToDelete = await Employee.findByPk(req.params.id);    // Fetch the `Employee` model. Stores data in `employeeToDelete` TEMPORARILY for only this function router.delete(). Once function ends, `employeeToDelete` will be garbaged.f

        if (!employeeToDelete) {
            res.status(404).json({ message: 'No employee found with this id!' });
            return;
        };

        await Employee.destroy({
            where: {id: req.params.id},
        });

        res.status(200).json({ message: `Employee '${employeeToDelete.first_name} ${employeeToDelete.last_name}' has been deleted!` });
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

module.exports = router;