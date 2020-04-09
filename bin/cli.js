#! /usr/bin/env node

"use strict";

// 命令行工具相关
const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");
const ProgressBar = require("progress");
// 爬虫相关
const { URL } = require("url");
const {
  HhimmDetailSpider,
  HhimmSectionSpider,
  HhimmImageSpider,
  HhimmSearchSpider,
} = require("../src/spider/hhimm/index.js");
const { Comic, Section, Image } = require("../src/entity/index.js");

// 存储漫画对象
const comic = new Comic();

/**
 * 询问章节后下载
 *
 * @param {*} vals ({inputURL}) 章节路径
 * @returns
 */
async function sectionQuery(vals) {
  return Promise.resolve(vals)
    .then(async ({ inputURL }) => {
      // 执行爬取章节
      const spinner = ora("爬取所选章节页并解析中...\n").start();
      const { title, href, sections } = await new HhimmDetailSpider(
        inputURL
      ).crawl();
      spinner.stop();
      comic.title = title;
      comic.href = href;
      comic.sections = sections.map(
        (section) => new Section(section.title, section.href)
      );
      // 以列表的方式打印章节，供用户选择章节（第一项为爬取所有）
      return inquirer.prompt([
        {
          type: "checkbox",
          message: "选择下载篇章",
          name: "selection",
          choices: [
            {
              name: "下载所有",
              value: -1,
            },
            ...comic.sections.map((section, index) => ({
              name: `[${index + 1}] ${section.title}`,
              value: index,
            })),
          ],
          validate: function (answer) {
            if (answer.length < 1) {
              return "至少选择一项，按空格选择。";
            }
            return true;
          },
        },
      ]);
    })
    .then(async ({ selection }) => {
      if (selection.indexOf(-1) === -1) {
        comic.sections = comic.sections.filter(
          (section, index) => selection.indexOf(index) !== -1
        );
      }
      // 爬取所选章节内容
      const spinner = ora("爬取章节页详情并解析中...\n").start();
      const allImages = await Promise.all(
        comic.sections.map((section) =>
          new HhimmSectionSpider(section.href).crawl()
        )
      );
      allImages.forEach((images, index) => {
        comic.sections[index].images = images.map(
          (image) => new Image(image.page, image.href)
        );
      });
      spinner.stop();
    })
    .then(async () => {
      // 下载图片保存内容
      for (const section of comic.sections) {
        // 进度条
        const bar = new ProgressBar(
          `${section.title} 下载中: [:bar] :percent :etas :elapsed`,
          {
            complete: "=",
            incomplete: " ",
            width: 20,
            total: section.images.length,
          }
        );

        for (const image of section.images) {
          await new HhimmImageSpider(image.href).crawl(
            `${process.cwd()}/download/${comic.title}/${section.title}`,
            image.page
          );
          bar.tick();
        }
      }
      console.log(chalk.yellow(`${comic.title} 下载完成 ~`));
    });
}

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
      const actions = {
        url: function () {
          return inquirer
            .prompt([
              {
                type: "input",
                name: "inputURL",
                message:
                  "请输入章节地址：\n" +
                  chalk.grey(
                    "前往 http://www.hhimm.com/ 选择一本漫画，复制地址。\n" +
                      "例如：http://www.hhimm.com/manhua/example.html \n"
                  ),
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
            .then(sectionQuery);
        },
        search: function () {
          return inquirer
            .prompt([
              {
                type: "input",
                name: "inputSearch",
                message: "请输入查询漫画名称：\n",
                validate: function (input) {
                  if (input.trim().length > 0) {
                    return true;
                  }
                  return chalk.red("请输入需要查询的漫画名称");
                },
              },
            ])
            .then(async ({ inputSearch }) => {
              const searchURL = `http://www.hhimm.com/comic/?act=search&st=${inputSearch}`;
              const spinner = ora("查找中...\n").start();
              const { info, comics } = await new HhimmSearchSpider(
                searchURL
              ).crawl();
              spinner.stop();
              console.log(chalk.blue(info));
              if (comics.length === 0) {
                throw new Error("没有找到任何内容");
              }
              // 给命令行提供查找行为
              return inquirer
                .prompt([
                  {
                    type: "list",
                    name: "inputURL",
                    message: "请选择你想下载的漫画：\n",
                    choices: comics.map((c, index) => ({
                      name:
                        `[${index + 1}]` +
                        c.title +
                        chalk.gray(` 预览：${c.previewLink} `) +
                        chalk.green(` 地址：${c.href} `),
                      value: c.href,
                    })),
                  },
                ])
                .then(sectionQuery);
            });
        },
      };
      return actions[crawlType]();
    })
    .catch((err) => {
      console.error(chalk.red(err));
    });
}

main();
