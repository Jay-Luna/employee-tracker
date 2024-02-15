//  Packages needed for this application
const table = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234abcd',
    database: 'employee_db'
});

// Creates a function to initialize app
function init() {
    // Creates an array of questions for user input
    const questions = [
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role',
                'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
            name: 'options'
        }
    ];

    inquirer
        .prompt(questions)
        .then(({ options }) => {
            // Switch case to switch between the options
            switch (options) {
                case 'View All Employees':
                    getAllEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'View All Roles':
                    getAllRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    getAllDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
            }
        });
}

/// Helper functions
function displayTable(results) {
    // displays formatted table
    const cTable = table.getTable(results);
    console.log(cTable);
    init(); // starts prompt again
}

var departmentArray = [];
// Get department name lists
function getDepartmentList() {
    const sql = 'SELECT * FROM department ORDER BY department.id';
    connection.query(sql, function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            departmentArray.push(res[i].name);
        }
    })
    return departmentArray;
}

var roleArr = [];
// Get role title lists
function getRoleList() {
    const sql = 'SELECT * FROM role ORDER BY role.id';
    connection.query(sql, function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
}

var managerArr = [];
// Get manager name lists, includes None option
function getManagerList() {
    const sql = 'SELECT * FROM employee ORDER BY employee.id';
    connection.query(sql, function (err, res) {
        if (err) throw err
        managerArr.push('None');
        for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].first_name + ' ' + res[i].last_name);
        }
    });
    return managerArr;
}

var employeeArr = [];
// Get all employees
function getEmployeeList() {
    const sql = 'SELECT * FROM employee ORDER BY employee.id';
    connection.query(sql, function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            var fullName = res[i].first_name + ' ' + res[i].last_name;
            employeeArr.push(fullName);
        }
    });
    return employeeArr;
}

// Get all employees & display in table
function getAllEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(e.first_name, ' ' , e.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id left join employee e on employee.manager_id = e.id ORDER BY employee.id;",
        function (err, res) {
            if (err) throw err;
            displayTable(res);
        }
    )
}

// Show All prompts for adding an employee
function addEmployee() {
    // Creates an array of questions for user input
    const questions = [
        {
            type: 'input',
            message: `What is the employee's first name?`,
            name: 'first_name',
        },
        {
            type: 'input',
            message: `What is the employee's last name?`,
            name: 'last_name',
        },
        {
            type: 'list',
            message: `What is the employee's role?`,
            choices: getRoleList(),
            name: 'role'
        },
        {
            type: 'list',
            message: `Who is the employee's manager?`,
            choices: getManagerList(),
            name: 'manager'
        }
    ];

    // Inquirer prompt to collect department data being added to table
    inquirer.prompt(questions)
        .then(({ first_name, last_name, role, manager }) => {
            // get index value of role (this is equivalent to role_id)
            var role_id = getRoleList().indexOf(role) + 1;
            // get index value of manager list (this is equivalent to manager_id)
            var manager_id = getManagerList().indexOf(manager);
            // if 'None' select, set manager_id to null
            if (manager == 'None') {
                manager_id = null;
            }
            let employee = { first_name, last_name, role_id, manager_id };
            const sql = 'INSERT INTO employee SET ?';
            connection.query(sql, employee, function (err, res) {
                if (err) throw err;
                console.log("Added " + first_name + " " + last_name + " to the database");
                init(); // start prompt again
            }
            )
        });
}

function updateEmployee() {
    // Creates an array of questions for user input
    const questions = [
        {
            type: "confirm",
            message: "Do you want to update?",
            name: 'update'
        },
        {
            type: 'list',
            message: `Which employee's role do you want to update?`,
            choices: getEmployeeList(),
            name: 'employee'
        },
        {
            type: 'list',
            message: 'Which role do you want to assign the selected employee?',
            choices: getRoleList(),
            name: 'role'
        }
    ];

    // Inquirer prompt to collect department data being added to table
    inquirer.prompt(questions)
        .then(({ employee, role }) => {
            // get index value of employee list (this is equivalent to employee_id)
            var id = getEmployeeList().indexOf(employee) + 1;
            // get index value of role (this is equivalent to role_id)
            var role_id = getRoleList().indexOf(role) + 1;
            const sql = 'UPDATE employee SET ? WHERE `id`=' + id;
            connection.query(sql, { role_id }, function (err, res) {
                if (err) throw err;
                console.log("Updated " + employee + " in the database");
                init();
            }
            )
        });
}

// View all roles including department name instead of department id
function getAllRoles() {
    const sql = 'SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id;'
    connection.query(sql, function (err, res) {
        if (err) throw err;
        displayTable(res);
    }
    )
}

// Add new roles and show prompts
function addRole() {
    // Creates an array of questions for user input
    const questions = [
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'title',
        },
        {
            type: 'number',
            message: 'What is the salary of the role?',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'Which department does the role belong to?',
            choices: getDepartmentList(),
            name: 'department'
        }
    ];

    // Inquirer prompt to collect department data being added to table
    inquirer.prompt(questions)
        .then(({ title, salary, department }) => {
            // get index value of department list (this is equivalent to department_id)
            var department_id = getDepartmentList().indexOf(department) + 1;
            let role = { title, salary, department_id };
            const sql = 'INSERT INTO role SET ?';
            connection.query(sql, role, function (err, res) {
                if (err) throw err;
                console.log("Added " + title + " to the database");
                init();
            }
            )
        });
}

// View all departments & display table
function getAllDepartments() {
    connection.query('SELECT * FROM department ORDER BY department.id',
        function (err, res) {
            if (err) throw err;
            displayTable(res);
        }
    )
}

// Add new department and show prompts
function addDepartment() {
    // Creates an array of questions for user input
    const questions = [
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'name',
        }
    ];

    // Inquirer prompt to collect department data being added to table
    inquirer.prompt(questions)
        .then(({ name }) => {
            var sql = "INSERT INTO department (name) VALUE ('" + name + "')";

            connection.query(sql, [name], function (err, res) {
                if (err) throw err;
                console.log("Added " + name + " to the database");
                init(); // start prompt again
            });
        });
};

init(); // start prompt