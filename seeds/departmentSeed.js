const { Department } = require('../models');

const departmentData = [
    {
        department_name: 'Engineering',
        description: 'The designing and testing of machines and components'
    },
    {
        department_name: 'Legal',
        description: 'Ensure accountable decisions are taken at the right level'
    }
];

const seedDepartments = () => Department.bulkCreate(departmentData);

module.exports = seedDepartments;