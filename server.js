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
    const cTable = table.getTable(results);
    console.log(cTable);
    init();
}

function getAllDepartmentNames() {
    var departmentArray = [];
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            departmentArray.push(res[i].name);
        }
    })
    return departmentArray;
}

var departmentId = 0;
async function getDepartmentId(name) {
    var departmentArray = [];
    const sql = `SELECT * FROM department WHERE department.name = '` + name + `'`;
    connection.query(sql, function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            departmentArray.push(res[i].name);
        }
    })
    let selectedDepartment = departmentArray.filter(department => department.name === name)
    console.log(selectedDepartment);
    return selectedDepartment.id;
}

function getRoleList() {
    var roleArr = [];
    const sql = 'SELECT * FROM role';
    connection.query(sql, function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
}

function getEmployeeList() {
    var employeeArr = [];
    const sql = 'SELECT * FROM employee';
    connection.query(sql, function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            employeeArr.push(res[i].first_name + ' ' + res[i].last_name);
        }
    })
    return employeeArr;
}

function getAllEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(e.first_name, ' ' , e.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id left join employee e on employee.manager_id = e.id;",
        function (err, res) {
            if (err) throw err;
            displayTable(res);
        }
    )
}

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
            name: 'roles'
        },
        {
            type: 'list',
            message: `Who is the employee's manager?`,
            choices: getEmployeeList(),
            name: 'manager'
        }
    ];

    // Inquirer prompt to collect department data being added to table
    inquirer.prompt(questions)
        .then(({ first_name, last_name, roles, manager }) => {
            let employee = { first_name, last_name, role_id: 1, manager_id: null };
            console.log(employee)
            const sql = 'INSERT INTO employee SET ?';
            connection.query(sql, employee, function (err, res) {
                if (err) throw err;
                console.log("Added " + first_name + " " + last_name + " to the database");
                init();
            }
            )
        });
}

function updateEmployee() {
    // Creates an array of questions for user input
    const questions = [
        {
            type: 'list',
            message: `Which employee's role do you want to update?`,
            choices: getAllEmployees(),
            name: 'employees'
        },
        {
            type: 'list',
            message: 'Which role do you want to assign the selected employee',
            choices: getRoleList(),
            name: 'roles'
        }
    ];

    // Inquirer prompt to collect department data being added to table
    inquirer.prompt(questions)
        .then(({ employees, roles }) => {
            // let role = [title, salary, "1"];
            // connection.query('INSERT INTO role (title, salary, department_id) VALUE (?)',
            //     [role],
            //     function (err, res) {
            //         if (err) throw err;
            //     }
            // )
        });
}

// View all roles including department name instead of department id
function getAllRoles() {
    connection.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id;',
        function (err, res) {
            if (err) throw err;
            displayTable(res);
        }
    )
}

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
            choices: getAllDepartmentNames(),
            name: 'department'
        }
    ];

    // Inquirer prompt to collect department data being added to table
    inquirer.prompt(questions)
        .then(({ title, salary, department }) => {
            // let department_id = getDepartmentId(department);
            // console.log(department_id)
            let role = { title, salary, department_id: "1" };
            const sql = 'INSERT INTO role SET ?';
            connection.query(sql, role, function (err, res) {
                if (err) throw err;
                console.log("Added " + title + " to the database");
                init();
            }
            )
        });
}

function getAllDepartments() {
    connection.query('SELECT * FROM department',
        function (err, res) {
            if (err) throw err;
            displayTable(res);
        }
    )
}

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
                init();
            });
        });
};

init();