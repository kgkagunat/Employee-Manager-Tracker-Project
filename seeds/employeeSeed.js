const { Employee } = require('../models');

const employeeData = [
    {
        first_name: 'John',
        last_name: 'Doe',
        employee_manager: 'Is Manager',
        job_id: 2,
        department_id: 2
    },
    {
        first_name: 'Bailey',
        last_name: 'Hunt',
        employee_manager: 'John Doe',
        job_id: 3,
        department_id: 2
    },
    {
        first_name: 'Damien',
        last_name: 'Vasquez',
        employee_manager: 'John Doe',
        job_id: 4,
        department_id: 2
    },
    {
        first_name: 'Angel',
        last_name: 'Bennett',
        employee_manager: 'Is Manager',
        job_id: 6,
        department_id: 3
    },
    {
        first_name: 'Madison',
        last_name: 'Hawkins',
        employee_manager: 'Angel Bennett',
        job_id: 7,
        department_id: 3
    },
    {
        first_name: 'Ella',
        last_name: 'Bates',
        employee_manager: 'Angel Bennett',
        job_id: 7,
        department_id: 3
    },
    {
        first_name: 'Tucker',
        last_name: 'Murray',
        employee_manager: 'Angel Bennett',
        job_id: 8,
        department_id: 3
    },
    {
        first_name: 'Morgan',
        last_name: 'Freeman',
        employee_manager: 'Is Manager',
        job_id: 9,
        department_id: 4
    }
]

const seedEmployee = () => Employee.bulkCreate(employeeData);

module.exports = seedEmployee;