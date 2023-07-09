const router = require('express').Router();
const { Department, Jobs, Employee } = require('../../models');


// POST a new job
router.post('/', async (req, res) => {
    try {
        await Jobs.create(req.body);
        res.redirect('/jobs');
    } catch (err) {
        res.status(500).json(err);
    };
});



// PUT update a job by id
router.put('/:id', async (req, res) => {
    try {
        const jobData = await Jobs.update(req.body, {
            where: {id: req.params.id},
        });

        if (!jobData) {
            res.status(404).json({ message: 'No job found with this id!' });
            return;
        };

        res.redirect('/jobs');
    } catch (err) {
        res.status(500).json(err);
    };
});



// DELETE a job by id
router.delete('/:id', async (req, res) => {
    try {
        const jobsToDelete = await Jobs.findByPk(req.params.id);
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

        res.redirect('/jobs');
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;