const { Employee } = require('../models');

const employeeData = [
    {
        first_name: 'John',
        last_name: 'Doe',
        // employee_title: 'Lead Engineer',
        employee_manager: 'Is Manager',
        job_id: 2,
        department_id: 2
    },
    {
        first_name: 'Tom',
        last_name: 'Cruise',
        // employee_title: 'Mechanical Engineer',
        employee_manager: 'John Doe',
        job_id: 4,
        department_id: 2
    },
    {
        first_name: 'Luke',
        last_name: 'Skywalker',
        // employee_title: 'Legal Team Lead',
        employee_manager: 'Is Manager',
        job_id: 6,
        department_id: 3
    },
    {
        first_name: 'Darth',
        last_name: 'Vader',
        // employee_title: 'Lawyer',
        employee_manager: 'Luke Skywalker',
        job_id: 8,
        department_id: 3
    },
]

const seedEmployee = () => Employee.bulkCreate(employeeData);

module.exports = seedEmployee;