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
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Department, key: 'id'},
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'jobs',
    }
);

//============================================================================================

module.exports = Jobs;

// Let me know if there are any `errors` in the model
// Let me know if you want to add/change the `properties` of the model