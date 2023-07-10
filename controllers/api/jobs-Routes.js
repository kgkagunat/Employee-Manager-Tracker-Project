const router = require('express').Router();
const { Department, Jobs, Employee } = require('../../models');


// Route to render 'create-job' view
router.get('/create', async (req, res) => {
    console.log('Hit /create route');
    try {
        const departmentData = await Department.findAll();
        const departments = departmentData.map((department) => department.get({ plain: true }));
        res.render('create-job', { departments });
    } catch (err) {
        res.status(500).json(err);
    };
});


// POST route to create a new job
router.post('/', async (req, res) => {
    try {
        const newJob = await Jobs.create({
            job_title: req.body.job_title,
            job_description: req.body.job_description,
            job_salary: req.body.job_salary,
            department_id: req.body.department_id
        }); 

        res.status(201).json(newJob);
    } catch (err) {
        res.status(500).json(err);
    }
});


// NEW: GET job details by id
router.get('/:id', async (req, res) => {
    try {
      const jobData = await Jobs.findByPk(req.params.id, {
          include: [Department]
      });
  
      if (!jobData) {
          res.status(404).json({ message: 'No job found with this id!' });
          return;
      }
      res.status(200).json(jobData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// PUT update a Job by id
router.put('/:id', async (req, res) => {
    try {
        const jobData = await Jobs.update(req.body, {
            where: {id: req.params.id},
        });

        if (!jobData) {
            res.status(404).json({ message: 'No job found with this id!' });
            return;
        };

        res.status(200).json({message:'Job updated'});
    } catch (err) {
        res.status(500).json(err);
    };
});


// DELETE a Job by id (re-assign employees to Unassigned Job)
router.delete('/:id', async (req, res) => {
    try {
        const jobToDelete = await Jobs.findByPk(req.params.id);

        if (!jobToDelete) {
            res.status(404).json({ message: 'No job found with this id!' });
            return;
        };

        // Fetch the `Unassigned Job`
        const unassignedJob = await Jobs.findOne({
            where: {job_title: 'Unassigned Jobs (DO NOT REMOVE)'}
        });

        if (!unassignedJob) {
            res.status(404).json({ message: 'No Unassigned Job found!' });
            return;
        };

        // Update employees to Unassigned Job
        await Employee.update({ job_id: unassignedJob.id }, {
            where: { job_id: jobToDelete.id }
        });

        // Delete Job
        await Jobs.destroy({
            where: {id: req.params.id},
        });

        res.status(200).json({message:'Job deleted successfully.'});
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;
