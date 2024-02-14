// import models
const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');

// Employee-Role relationship
Employee.belongsTo(Role);
Role.hasMany(Employee);

// Deparement-Role relationship
Role.belongsTo(Department);
Department.hasMany(Role);

module.exports = {
    Employee,
    Role,
    Department
};