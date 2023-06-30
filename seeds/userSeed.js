const { User } = require('../models');

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