const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// Ask user for manager info

function askUserForManagerInfo() {
  return inquirer
    .prompt([
      {
        message: "What is your name?",
        name: "name",
        type: "input",
      },

      {
        message: "What is your Id?",
        name: "id",
        type: "input",
      },

      {
        message: "What is your Email?",
        name: "email",
        type: "input",
      },

      {
        message: "What is your Phone Number?",
        name: "phone",
        type: "input",
      },
    ])
    .then((response) => {
      const newManager = new Manager(
        response.name,
        response.id,
        response.email,
        response.phone
      );
      employeeArray.push(newManager);

      askUserForEmployeeType();
    });
}

// Ask use for next employee type

function askUserForEmployeeType() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Add an employee type",
        choices: [
          "manager",
          new inquirer.Separator(),
          "engineer",
          new inquirer.Separator(),
          "intern",
          new inquirer.Separator(),
          "exit",
        ],
      },
    ])
    .then((response) => {
      if (response.employee === "manager") {
        askUserForManagerInfo();
      } else if (response.employee === "engineer") {
        askUserForEngineerInfo();
      } else if (response.employee === "intern") {
        askUserForInternInfo();
      } else if (response.employee === "exit") {
        createHtmlContent();
      }
    });
}

// Ask user for engineer info
function askUserForEngineerInfo() {
  return inquirer
    .prompt([
      {
        message: "What is your name?",
        name: "name",
        type: "input",
      },

      {
        message: "What is your Id?",
        name: "id",
        type: "input",
      },

      {
        message: "What is your Email?",
        name: "email",
        type: "input",
      },

      {
        message: "What is your Github?",
        name: "github",
        type: "input",
      },
    ])
    .then((response) => {
      const newEngineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      employeeArray.push(newEngineer);

      askUserForEmployeeType();
    });
}

// Ask user for intern info
function askUserForInternInfo() {
  return inquirer
    .prompt([
      {
        message: "What is your name?",
        name: "name",
        type: "input",
      },

      {
        message: "What is your Id?",
        name: "id",
        type: "input",
      },

      {
        message: "What is your Email?",
        name: "email",
        type: "input",
      },

      {
        message: "What is your School?",
        name: "school",
        type: "input",
      },
    ])
    .then((response) => {
      const newIntern = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
      employeeArray.push(newIntern);

      askUserForEmployeeType();
    });
}

function createHtmlContent() {
  const htmlContent = render(employeeArray);
  fs.writeFileSync("testindex.html", htmlContent);
}

askUserForEmployeeType();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
