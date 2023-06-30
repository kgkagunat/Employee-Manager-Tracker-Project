const Department = require('./Department');
const Employee = require('./Employee');
const Jobs = require('./Jobs');
const User = require('./User');

//============================================================================================

Department.hasMany(Jobs, {              // Department has many jobs
    foreignKey: 'department_id'
});

Jobs.belongsTo(Department, {            // Jobs belong to department        (when department is deleted, jobs are set to `NULL`)
    foreignKey: 'department_id'
});

Jobs.hasMany(Employee, {                // Jobs has many employees
    foreignKey: 'job_id'
});

Employee.belongsTo(Jobs, {              // Employee belongs to jobs     (when job is deleted, employees are set to `NULL`)
    foreignKey: 'job_id'
});

Department.hasMany(Employee, {          // Department has many employees    
    foreignKey: 'department_id'
});

Employee.belongsTo(Department, {        // Employee belongs to department       (when department is deleted, employees are set to `NULL`)
    foreignKey: 'department_id'
});

//============================================================================================

module.exports = { Department, Employee, Jobs, User };

// Let me know if there are any `errors` in the model