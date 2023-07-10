const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Department = require('./Department');

class Jobs extends Model {}

//============================================================================================

Jobs.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        job_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job_salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: Department, key: 'id'},
        },
    },
    {
        sequelize,
        timestamps: true,
        createdAt: 'creationDate',
        updatedAt: 'modifiedDate',
        freezeTableName: true,
        underscored: true,
        modelName: 'jobs',
    }
);

//============================================================================================

module.exports = Jobs;