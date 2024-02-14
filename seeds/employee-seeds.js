const { Employee } = require('../models');

const employeeData = [
    {
        first_name: 'John',
        last_name: 'Doe',
        role_id: 1,
        manager_id: null
    },
    {
        first_name: 'Jane',
        last_name: 'Doe',
        role_id: 2,
        manager_id: 1
    },
    {
        first_name: 'Sarah',
        last_name: 'Lourd',
        role_id: 3,
        manager_id: null
    },
    {
        first_name: 'Sushi',
        last_name: 'Cracker',
        role_id: 4,
        manager_id: 3
    },
    {
        first_name: 'Mango',
        last_name: 'Peach',
        role_id: 5,
        manager_id: 4
    }
];

const seedTags = () => Employee.bulkCreate(employeeData);

module.exports = seedTags;