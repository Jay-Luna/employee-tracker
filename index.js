//  packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// Creates an array of questions for user input
const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role',
            'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
        name: 'action',

    }
];

// Creates a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((response) => {
            console.log(response.action);
        });
}

// Function call to initialize app
init();