const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Jobs = require('./Jobs');
const Department = require('./Department');

class Employee extends Model {}

//============================================================================================

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_manager: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_salary: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        job_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: Jobs, key: 'id' },
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: Department, key: 'id' },
        }
    },
    {
        sequelize,
        timestamps: true,
        createdAt: 'creationDate',
        updatedAt: 'modifiedDate',
        freezeTableName: true,
        underscored: true,
        modelName: 'employee'
    }
);

//============================================================================================

module.exports = Employee;


// Let me know if there are any `errors` in the model
// Let me know if you want to add/change the `properties` of the model