const { Model, DataTypes } = require('sequelize');
// const passport = require('passport');   // !!! For JOSE, this line is where the passport.js file will be loaded. This is just a placeholder for now. !!!
const sequelize = require('../config/connection');

//============================================================================================

class User extends Model {
    // checkPassword(loginPw) {
    //     return bcrypt.compareSync(loginPw, this.password);
    // }                                
}                   // !!! For JOSE, need to enter the passport.js and replace bcrypt !!!

//============================================================================================

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {isEmail: true}
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [8]}
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {      // !!! For JOSE, need to use passport.js and replace bcrypt here. Might need to change this function as well. Don't know if passport.js uses `hooks:` !!!
                // newUserData.password = await bcrypt.hash(newUserData.password, 10);
                // return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {      // !!! For JOSE, need to use passport.js and replace bcrypt here. Might need to change this function as well. Don't know if passport.js uses `hooks:` !!!
                // updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                // return updatedUserData;
            },
        },
        sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'user'
    }
);

//============================================================================================

module.exports = User;

// !!! This entire code in the User.js file, might change depening on the passport.js rules or syntax !!!

// Let me know if there are any `errors` in the model
// Let me know if you want to add/change the `properties` of the model