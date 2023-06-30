const { User } = require('../models');
console.log(User);          // !!! TESTING purposes only !!!

const userData = [
    {
        name: 'John Doe',
        email: 'johnDoe@example.com',
        password: 'password123'
    },
    {
        name: 'Jane Doe',
        email: 'janeDoe@example.com',
        password: 'password456'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;