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
                    break;
                case 'Update Employee Role':
                    break;
                case 'View All Roles':
                    getAllRoles();
                    break;
                case 'Add Role':
                    break;
                case 'View All Departments':
                    getAllDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                default:
                    console.log("nothing");
            }
        });
}

function displayTable(results) {
    const cTable = table.getTable(results);
    console.log(cTable);
    init();
}

function getAllEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(e.first_name, ' ' , e.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id left join employee e on employee.manager_id = e.id;", 
        function (err, res) {
            if (err) throw err;
            displayTable(res);
        }
    )
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

function getAllDepartments() {
    connection.query('SELECT * FROM `department`',
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
            console.log(name);

            connection.query(sql, [name], function (err, res) {
                if (err) throw err;
                console.log("Added " + name + " to the database");
                init();
            });
        });
};

init();