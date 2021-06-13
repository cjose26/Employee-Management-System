const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table')
var connection = require ('./connection')


function asyncConnectionQuery(queryStr, argValues) {
    return new Promise((resolve, reject) => {
      connection.query(queryStr, argValues, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

connection.connect((err) => {
  if (err) throw err;
  startApp();
});


function startApp() {
    inquirer.prompt({
        name: 'select',
        type: 'list' ,
        message: 'What action would you like to take?',
        choices: [
            {name:'View all Employees', value: 0},
            {name:'View all Departments', value: 1},
            {name:'View all Roles', value: 2},
            {name:'Add Employee', value:3},
            {name:'Update Employee Role', value: 4},
            {name:'Add Role', value: 5},
            {name:'Add Department', value: 6},
            {name:'Exit Program' , value:7},
        ]
    }).then(function(answers) {
        if (answers.select === 0) {
            viewEmployees();
        }
        else if (answers.select === 1) {
            viewDepartment();
        }
        else if (answers.select === 2) {
            viewRole();
        } 
        else if (answers.select === 3) {
            addEmployee();
        }
        else if (answers.select === 4) {
            updateRole();
        }
        else if (answers.select === 5) {
            addRole();
        }
        else if (answers.select === 6) {
            addDepartment();
        } 
        else if (answers.select === 7) {
            console.log('Goodbye')
           process.exit()
           
        } 
    })
};

function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        for (var i=0; i< res.length; i++) {
            console.table(res[i]);
            console.log('Press Down key to continue');
        }
    });

    startApp();
}

function viewDepartment() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        for (var i=0; i< res.length; i++) {
            console.table(res[i]);
            console.log('Press Down key to continue');
        }
  })
    startApp();
}

function viewRole() {
    var query = "SELECT * FROM role"
    connection.query(query, function(err, res) {
        for (var i=0; i< res.length; i++) {
            console.table(res[i]);
            console.log('Press Down key to continue');
        }
    })
    startApp();
};

function addEmployee() {
    inquirer.prompt([{
        name: 'first_name',
        type: 'input',
        message: 'What is the first name of the Employee?',
    }, {
        name: 'last_name',
        type:'input',
        message:'What is the last name of the Employee?',
    }, {
        name: 'title',
        type: 'input',
        message: 'What is the title of the Employee?',
    }, {
        name: 'role_id',
        type: 'input',
        message: 'What is the role ID of the Employee?',
    }]).then(function(answers) {
        asyncConnectionQuery('INSERT INTO employee SET ?' , {
            first_name: answers.first_name,
            last_name: answers.last_name,
            title: answers.title,
            role_id: answers.role_id
        }).then( 
            inquirer.prompt([{
                name:'finished',
                type:'list',
                message: 'Employee has been added to the database. Would you like to exit the program?',
                choices:[
                    {name:'Yes, Exit Program' , value: 0},
                    {name: 'No, return to main prompt',  value:1},
                ]
            }]).then(function(answers) {
                if (answers.select = 0) {
                    console.log('Goodbye')
                    process.exit()
                } else {
                startApp()
                }
            })
    )})
}

function addRole() {
    inquirer.prompt([{
        name: 'add_role',
        type: 'input',
        message: 'What role would you like to add?',
    }, {
        name: 'role_salary',
        type: 'input',
        message: 'What is the expected salary for this Role?',
    }, {
        name: 'role_id',
        type: 'input',
        message: 'What is the role ID? If unknown, enter 1',
    }]).then(function(answers) {
        asyncConnectionQuery('INSERT INTO role SET ?' , {
            id: answers.role_id,
            title: answers.add_role,
            salary: answers.role_salary,
        }).then( 
            inquirer.prompt([{
                name:'finished',
                type:'list',
                message: 'Role has been added to the database. Would you like to exit the program?',
                choices:[
                    {name:'Yes, Exit Program' , value: 0},
                    {name: 'No, return to main prompt',  value:1},
                ]
            }]).then(function(answers) {
                if (answers.select = 0) {
                    console.log('Goodbye')
                    process.exit()
                } else {
                startApp()
                }
            })
    )})
}

function updateRole() {
    inquirer.prompt([{
        name: 'employee_name',
        type: 'input',
        message: 'What is the name of the Employee whos role you would like to update?',
    }, {
        name: 'name_of_role',
        type: 'list',
        message: 'What role would you like to assign this employee?',
        choices: [
            {name: 'Project Manager', value: 0},
            {name: 'Intern' , value: 1},
            {name: 'Software Engineer', value: 2},
            {name: 'HR Manager', value: 3},
            {name: 'HR Compliance', value: 4},
            {name: 'SEO Specialist', value: 5},
            {name: 'Brand Manager', value: 6},
            {name: 'Marketing Analyst', value: 7},
            {name: 'Customer Service Rep', value: 8},
            {name: 'Customer Service Manager', value: 9},
        ]
    }]).then(function(answers) {
        console.log(answers)
    })
    startApp();
}

function addDepartment() {
    inquirer.prompt([{
        name: 'department',
        type: 'input',
        message: 'What is the name of the department you would like to add?',
    }]).then(function(answers) {
        asyncConnectionQuery('INSERT INTO department SET ?' , {
           name: answers.department
        }).then( 
            inquirer.prompt([{
                name:'finished',
                type:'list',
                message: 'Department has been added to the database. Would you like to exit the program?',
                choices:[
                    {name:'Yes, Exit Program' , value: 0},
                    {name: 'No, return to main prompt',  value:1},
                ]
            }]).then(function(answers) {
                if (answers.select = 0) {
                    console.log('Goodbye')
                    process.exit()
                } else {
                startApp()
                }
            })
    )})
}