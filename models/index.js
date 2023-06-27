const Department = require('./Department');
const Employee = require('./Employee');
const Jobs = require('./Jobs');

//============================================================================================

Department.hasMany(Jobs, {
    foreignKey: 'department_id'
});

Jobs.belongsTo(Department, {
    foreignKey: 'department_id'
});

Jobs.hasMany(Employee, {
    foreignKey: 'job_id'
});

Employee.belongsTo(Jobs, {
    foreignKey: 'job_id'
});

//============================================================================================

module.exports = { Department, Employee, Jobs };

// Let me know if there are any `errors` in the model