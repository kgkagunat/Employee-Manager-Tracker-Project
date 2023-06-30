const { Employee } = require('../../models');

const employeeData = [
    {
        first_name: 'John',
        last_name: 'Doe',
        employee_title: 'Lead Engineer',
        employee_manager: 'Is Manager',
        employee_salary: '125000',
        job_id: 1,
        department_id: 1,
    },
    {
        first_name: 'Luke',
        last_name: 'Skywalker',
        employee_title: 'Lawyer',
        employee_manager: 'Is Manager',
        employee_salary: '525000',
        job_id: 2,
        department_id: 2,
    }
]

const seedEmployee = () => Employee.bulkCreate(employeeData);

module.exports = seedEmployee;