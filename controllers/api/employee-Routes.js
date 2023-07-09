const router = require('express').Router();
const { Department, Jobs, Employee } = require('../../models');







// POST a new employee
router.post('/', async (req, res) => {
    try {
        await Employee.create(req.body);
        res.redirect('/employees');
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