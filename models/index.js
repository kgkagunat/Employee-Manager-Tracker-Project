const Department = require('./Department');
const Employee = require('./Employee');
const Jobs = require('./Jobs');
const User = require('./User');

//============================================================================================

Department.hasMany(Jobs, {              // Department has many jobs
    foreignKey: 'department_id'
});

Jobs.belongsTo(Department, {            // Jobs belong to department       
    foreignKey: 'department_id',
    onDelete: 'CASCADE'
});

Jobs.hasMany(Employee, {                // Jobs has many employees
    foreignKey: 'job_id'
});

Employee.belongsTo(Jobs, {              // Employee belongs to jobs   
    foreignKey: 'job_id',
    onDelete: 'CASCADE'
});

Department.hasMany(Employee, {          // Department has many employees    
    foreignKey: 'department_id'
});

Employee.belongsTo(Department, {        // Employee belongs to department  
    foreignKey: 'department_id',
    onDelete: 'CASCADE'
});

//============================================================================================

module.exports = { Department, Employee, Jobs, User };