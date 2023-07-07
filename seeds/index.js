const sequelize = require('../config/connection');
const seedUsers = require('./userSeed');
const seedDepartments = require('./departmentSeed');
const seedJobs = require('./jobsSeed');
const seedEmployees = require('./employeeSeed');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedDepartments();
    console.log('\n----- DEPARTMENTS SEEDED -----\n');
    await seedJobs();
    console.log('\n----- JOBS SEEDED -----\n');
    await seedEmployees();
    console.log('\n----- EMPLOYEES SEEDED -----\n');

    process.exit(0);
};

seedAll();