#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const chalk = require("chalk");

if (process.argv.length < 3) {
  console.log("Please provide a name to your app");
  console.log("For example: ");
  console.log("npx create-solid-project my-project");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const templateURI = "https://github.com/solid-frameworks/solid-project.git";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log();
    console.log(
      `${chalk.redBright.bold("ALERT:")} ${chalk.whiteBright(projectName)} ${chalk.redBright("directory already exists!")}`
    );

    console.log();

    console.log(
      `${chalk.cyanBright("Run the command with a different name!")}`
    );

  } else {
    console.log(err);
  }

  process.exit(1);
}

const init = async () => {
  try {
    console.log(chalk.cyanBright("Fetching Template..."));
    execSync(`git clone ${templateURI} ${projectName}`);

    console.log(chalk.cyanBright("Normalizing Git..."));
    execSync(`cd ${projectPath} && rm -rf .git`);
    execSync(`cd ${projectPath} && git init`);

    console.log(chalk.cyanBright("Installing Necessary Packages..."));
    execSync(`cd ${projectPath} && npm i`);

    console.log();

    console.log(`${chalk.cyanBright("You should now do the following...")}`);

    console.log();

    console.log(`${chalk.bold.magentaBright("cd")} ${chalk.whiteBright(projectName)}`);
    console.log(`${chalk.bold.magentaBright("npm")} ${chalk.whiteBright("run dev")}`);

    console.log();

    console.log(`${chalk.cyanBright.bold("Solid Frameworks LLC, 2021")}`);

  } catch (error) {
    console.log(error);
  }
};

init();
