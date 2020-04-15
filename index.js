const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const generate = require("./utils/generatemk");
const axios = require("axios");
var divider = "\n------------------------------------------------------------\n\n";
const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "url",
        message: "the URL to your project?"
    },
    {
        type: "input",
        name: "title",
        message: "What is your project's name?"
    },
    {
        type: "input",
        name: "description",
        message: "Please write a short description of your project"
    },
    {
        type: "list",
        name: "license",
        message: "What kind of license should your project have?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
    },
    {
        type: "input",
        name: "installation",
        message: "What command should be run to install dependencies?",
        default: "npm i"
    },
    {
        type: "input",
        name: "test",
        message: "What command should be run to run tests?",
        default: "npm test"
    },
    {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the repo?",
    },
    {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to the repo?",
    }
];

function writetofile(fileName,data)
{
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);

}
function init() {
    inquirer.prompt(questions).then((inquirerresponse) => {

        writetofile("Readme.md", generate({ ...inquirerresponse }));
        runApi(inquirerresponse.github);
    })
}

function runApi(github) {
    var github="bssheetal";
        const queryUrl = `https://api.github.com/users/${github}`;
        axios.get(queryUrl).then(function (res) {
            //const avatar = res.data.avatar_url;
            var email=res.data.login;
            fs.appendFileSync("Readme.md",divider+email);
        });
    };


init();