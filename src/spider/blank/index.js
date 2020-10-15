const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");
const ProgressBar = require("progress");

const { Comic, Section, Image } = require("../../entity/index.js");
// 写命令行交互
