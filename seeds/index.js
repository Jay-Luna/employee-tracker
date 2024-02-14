const seedDepartments = require('./department-seeds');
const seedRoles = require('./role-seeds');
const seedEmployees = require('./employee-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedDepartments();
    console.log('\n----- DEPARTMENTS SEEDED -----\n');

    await seedRoles();
    console.log('\n----- ROLES SEEDED -----\n');

    await seedEmployees();
    console.log('\n----- EMPLOYEES SEEDED -----\n');

    process.exit(0);
};

seedAll();