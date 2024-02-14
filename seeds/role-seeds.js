const { Role } = require('../models');

const roleData = [
    {
        title: 'Sales Lead',
        salary: 100000,
        department_id: 4
    },
    {
        title: 'Salesperson',
        salary: 80000,
        department_id: 4
    },
    {
        title: 'Lead Engineer',
        salary: 150000,
        department_id: 1
    },
    {
        title: 'Account Manager',
        salary: 160000,
        department_id: 2
    },
    {
        title: 'Lawyer',
        salary: 190000,
        department_id: 3
    }
];

const seedTags = () => Role.bulkCreate(roleData);

module.exports = seedTags;