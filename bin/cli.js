#! /usr/bin/env node

"use strict";

// 命令行工具相关
const inquirer = require("inquirer");
const chalk = require("chalk");
const { hhimmCli, manhuabeiCli, sevenSevenMhCli } = require("../index.js");
// 版本号
const packageJson = require("../package.json");
const version = packageJson.version;

async function main() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "scource",
        message: `comicz-cli: ${version}\n请选择漫画来源：\n`,
        choices: [
          {
            name: "hhimm",
            value: "hhimm",
          },
          {
            name: "manhuabei",
            value: "manhuabei",
          },
          {
            name: "77mh",
            value: "sevenSevenMh",
          },
        ],
      },
    ])
    .then(({ scource }) => {
      // 根据类型，执行不同的任务
      const actions = {
        hhimm: hhimmCli,
        manhuabei: manhuabeiCli,
        sevenSevenMh: sevenSevenMhCli,
      };
      return actions[scource]();
    })
    .catch((err) => {
      console.error(chalk.red(err));
      process.exit(1);
    });
}

main();
