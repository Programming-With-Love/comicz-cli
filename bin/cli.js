#! /usr/bin/env node

"use strict";

const inquirer = require("inquirer");
const { URL } = require("url");
const chalk = require("chalk");

async function main() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "crawlType",
        message: "请选择指令类型：\n",
        choices: [
          {
            name: "URL 爬取章节",
            value: "url",
          },
          {
            name: "Search 查找名称",
            value: "search",
          },
        ],
      },
    ])
    .then(({ crawlType }) => {
      // 根据类型，执行不同的任务
      let actions = {
        url: inquirer
          .prompt([
            {
              type: "input",
              name: "inputURL",
              message:
                "请输入章节地址：\n" +
                chalk.grey("例如：http://www.hhimm.com/manhua/example.html\n"),
              validate: function (input) {
                try {
                  const targetURL = new URL(input);
                  if (targetURL.host === "www.hhimm.com") {
                    if (/\/manhua\/.*/.test(targetURL.pathname)) {
                      return true;
                    }
                  }
                  return chalk.red("目标 URL 格式不正确，请重新输入");
                } catch (error) {
                  return chalk.red(error.message);
                }
              },
            },
          ])
          .then(({ inputURL }) => {
            // 执行爬取章节
            // 以列表的方式打印章节，供用户选择章节（第一项为爬取所有）
            // 爬取所选章节内容，并保存
            console.log(inputURL);
          }),
        search: "todo",
      };
      return actions[crawlType];
    })
    .catch((err) => {
      console.error(err);
    });
}

main();
