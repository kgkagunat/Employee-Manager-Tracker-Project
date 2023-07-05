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
        timestamps: true, // true by default, added for clarity
        createdAt: 'creationDate', // renames the auto generated createdAt to creationDate
        updatedAt: 'modifiedDate', // renames the auto generated updatedAt to modifiedDate
        freezeTableName: true,
        underscored: true,
        modelName: 'department',
    }
);

//============================================================================================

module.exports = Department;


// Let me know if there are any `errors` in the model
// Let me know if you want to add/change the `properties` of the model