const { Jobs } = require('../models');

const jobsData = [
    {
        job_title: 'Unassigned Jobs (DO NOT REMOVE)',
        job_description: 'This jobs is for unassigned jobs (DO NOT REMOVE)',
        department_id: 1
    },
    {
        job_title: 'Lead Engineer',
        job_description: 'Head of the engineering team',
        department_id: 2
    },
    {
        job_title: 'Lawyer',
        job_description: 'Representing our clients and other legal proceedings',
        department_id: 3
    }
]

const seedJobs = () => Jobs.bulkCreate(jobsData);

module.exports = seedJobs;