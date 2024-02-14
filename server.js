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
                    break;
                case 'Add Employee':
                    break;
                case 'Update Employee Role':
                    break;
                case 'View All Roles':
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

function getAllDepartments() {
    connection.query('SELECT * FROM `department`',
        function (err, res) {
            const cTable = table.getTable(res);
            console.log(cTable);

            if (err) throw err;
            init();
        }
    )
}

function addDepartment() {
    // Creates an array of questions for user input
    const questions = [
        {
            type: 'input',
            message: 'Wha is the name of the department?',
            name: 'name',
        }
    ];

    // Inquirer prompt to collect department data being added to table
    inquirer.prompt(questions)
        .then(({ name }) => {
            // SQL 
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