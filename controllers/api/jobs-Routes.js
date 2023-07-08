const router = require('express').Router();
const { Department, Jobs, Employee } = require('../../models');
const { checkAuthenticated } = require('../../utils/checkAuth');



// GET all jobs
router.get('/', checkAuthenticated, async (req, res) => {
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
router.get('/:id', checkAuthenticated, async (req, res) => {
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

        res.render('job', { job });
    } catch (err) {
        res.status(500).json(err);
    };
});



// POST a new job
router.post('/', checkAuthenticated, async (req, res) => {
    try {
        await Jobs.create(req.body);
        res.redirect('/jobs');
    } catch (err) {
        res.status(500).json(err);
    };
});



// PUT update a job by id
router.put('/:id', checkAuthenticated, async (req, res) => {
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
router.delete('/:id', checkAuthenticated, async (req, res) => {
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