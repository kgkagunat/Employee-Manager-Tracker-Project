const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model {}

//============================================================================================

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        department_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true, 
        createdAt: 'creationDate', 
        updatedAt: 'modifiedDate', 
        freezeTableName: true,
        underscored: true,
        modelName: 'department',
    }
);

//============================================================================================

module.exports = Department;