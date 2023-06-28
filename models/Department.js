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
        creationDate: {
            type: DataTypes.DATE,
            allowNull: false,
      },
        modifiedDate: {
            type: DataTypes.DATE,
            allowNull: false,
      },
    },
    {
        hooks: {
            beforeCreate: async (department) => {       
                department.creationDate = new Date();   // Timestamping the DATE, on creation
                department.modifiedDate = new Date();   // Timestamping the DATE, when modified/updated
            },
            beforeUpdate: async (department) => {
                department.modifiedDate = new Date();   // Timestamping the DATE, on update
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'department',
    }
);

//============================================================================================

module.exports = Department;


// Let me know if there are any `errors` in the model
// Let me know if you want to add/change the `properties` of the model