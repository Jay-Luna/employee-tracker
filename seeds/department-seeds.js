const { Department } = require('../models');

const departmentData = [
    {
        name: 'Engineering'
    },
    {
        name: 'Finance'
    },
    {
        name: 'Legal'
    },
    {
        name: 'Sales'
    }
];

const seedTags = () => Department.bulkCreate(departmentData);

module.exports = seedTags;