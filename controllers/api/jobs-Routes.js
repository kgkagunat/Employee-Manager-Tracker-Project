const router = require('express').Router();
const { Department, Jobs, Employee } = require('../../models');

//===========================================================================

// GET all jobs
router.get('/', async (req, res) => {
    try {
        const jobsData = await Jobs.findAll({
            include: [
                {
                    model: Department,
                    attributes: ['id', 'department_name']
                }
            ]
        });

        res.status(200).json(jobsData); 
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// GET a single job by id
router.get('/:id', async (req, res) => {
    try {
        const jobData = await Jobs.findByPk(req.params.id, {
            include: [
                {
                    model: Department,
                    attributes: ['id', 'department_name']
                }
            ]
        });

        res.status(200).json(jobData);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// POST a new job
router.post('/', async (req, res) => {
    try {
        const jobData = await Jobs.create(req.body);
        res.status(200).json(jobData);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// PUT update a job by id
router.put('/:id', async (req, res) => {
    try {
        const [numberOfAffectedRows, affectedRows] = await Jobs.update(req.body, {
            where: {id: req.params.id},
            returning: true,
        });

        if (numberOfAffectedRows === 0) {
            res.status(404).json({ message: 'No job found with this id!' });
            return;
        };

        res.status(200).json(affectedRows);
    } catch (err) {
        res.status(500).json(err);
    };
});

//===========================================================================

// DELETE a job by id
router.delete('/:id', async (req, res) => {
    try {
        const jobsToDelete = await Jobs.findByPk(req.params.id);    // Fetch the `Jobs` model. Stores data in the `jobsToDelete` TEMPORARILY for only this function router.delete(). Once function ends, `jobsToDelete` will be garbaged.
        if (!jobsToDelete) {
            res.status(404).json({ message: 'No job found with this id!' });
            return;
        }

        // Fetch the `Unassigned Department`
        const unassignedJobs = await Jobs.findOne({
            where: { job_title: 'Unassigned Jobs (DO NOT REMOVE)'}
        });
        if (!unassignedJobs) {
            res.status(404).json({ message: 'No Unassigned Jobs found!' });
            return;
        };

        // Find All Employees to Job ID
        await Employee.update({ job_id: unassignedJobs.id }, {
            where: { job_id: req.params.id },
        });

        // Delete Jobs
        await Jobs.destroy({
            where: { id: req.params.id },
        });

        res.status(200).json({ message: `Job '${jobsToDelete.job_title}' has been deleted!` });
    } catch (err) {
        res.status(500).json(err);
    }
});

//===========================================================================

module.exports = router;