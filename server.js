//  packages needed for this application
const inquirer = require('inquirer');
const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
        console.log(`App listening on port ${PORT}!`));
});


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