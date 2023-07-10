const { Jobs } = require('../models');

const jobsData = [
    {
        job_title: 'Unassigned Jobs (DO NOT REMOVE)',
        job_description: 'This jobs is for unassigned employees to be placed in',
        job_salary: '0',
        department_id: 1
    },
    {
        job_title: 'Lead Engineer',
        job_description: 'Head of the engineering team',
        job_salary: '125000',
        department_id: 2
    },
    {
        job_title: 'Software Engineer',
        job_description: 'Head of the engineering team',
        job_salary: '100000',
        department_id: 2
    },
    {
        job_title: 'Mechanical Engineer',
        job_description: 'Head of the engineering team',
        job_salary: '90000',
        department_id: 2
    },
    {
        job_title: 'Electrical Engineer',
        job_description: 'Head of the engineering team',
        job_salary: '80000',
        department_id: 2
    },
    {
        job_title: 'Legal Team Lead',
        job_description: 'Representing our clients and other legal proceedings',
        job_salary: '100000',
        department_id: 3
    },
    {
        job_title: 'Volunteer Law Intern',
        job_description: 'Representing our clients and other legal proceedings',
        job_salary: '40000',
        department_id: 3
    },
    {
        job_title: 'Lawyer',
        job_description: 'Representing our clients and other legal proceedings',
        job_salary: '80000',
        department_id: 3
    },
    {
        job_title: 'Education Coordinator',
        job_description: 'Coordinates the education program',
        job_salary: '90000',
        department_id: 4
    },
    {
        job_title: 'Full Stack Professor',
        job_description: 'Coordinates the education program',
        job_salary: '80000',
        department_id: 4
    }
]

const seedJobs = () => Jobs.bulkCreate(jobsData);

module.exports = seedJobs;