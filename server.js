//  Packages needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234abcd',
    database: 'employee_db'
});

// Creates an array of questions for user input
const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role',
            'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
        name: 'action'
    }
];

// Creates a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((response) => {
            getAllDepartments();
        });
}

async function getAllDepartments() {
    connection.query('SELECT * FROM `department`',
        function (err, res) {
            console.table(res);
            if (err) throw err;
            init();
        }
    )
}

init();