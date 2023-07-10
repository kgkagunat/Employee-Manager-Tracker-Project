const { Department } = require('../models');

const departmentData = [
    {
        department_name: 'Unassigned Department (DO NOT REMOVE)',
        description: 'This department is for unassigned jobs to be placed in'
    },
    {
        department_name: 'Engineering',
        description: 'The designing and testing of machines and components'
    },
    {
        department_name: 'Legal',
        description: 'Ensure accountable decisions are taken at the right level'
    },
    {
        department_name: 'Education',
        description: 'The process of receiving or giving systematic instruction, especially at a school or university.'
    }
];

const seedDepartments = () => Department.bulkCreate(departmentData);

module.exports = seedDepartments;