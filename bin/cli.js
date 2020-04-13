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
      const spinner = ora("爬取所选章节并解析中...").start();
      try {
        const { title, href, sections } = await new HhimmDetailSpider(
          inputURL
        ).crawl();
        comic.title = title;
        comic.href = href;
        comic.sections = sections.map(
          (section) => new Section(section.title, section.href)
        );
      } catch (error) {
        throw error;
      } finally {
        spinner.stop();
      }
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
      console.log(chalk.cyan(`总共选取${comic.sections.length}章`));
      for (const [index, section] of comic.sections.entries()) {
        const spinner = ora(
          `[${index + 1}]${section.title} 爬取详情并解析中...`
        ).start();
        try {
          const hhimmSectionSpider = new HhimmSectionSpider(section.href);
          hhimmSectionSpider.on("crawl-page-done", ({ page, totalPage }) => {
            spinner.text = `[${index + 1}]${
              section.title
            } 爬取详情并解析中...(${page}/${totalPage})`;
          });
          hhimmSectionSpider.on(
            "crawl-page-retry",
            ({ page, totalPage, retryTimes }) => {
              spinner.text = `[${index + 1}]${
                section.title
              } 爬取详情并解析中...(${page}/${totalPage} 重试${retryTimes}次)`;
            }
          );
          const images = await hhimmSectionSpider.crawl();
          section.images = images.map(
            (image) => new Image(image.page, image.hrefs)
          );
          spinner.succeed(`【${section.title}】解析完成`);
        } catch (error) {
          spinner.fail(chalk.red(`【${section.title}】解析失败`));
          throw error;
        }
      }
    })
    .then(async () => {
      // 下载图片保存内容
      for (const section of comic.sections) {
        // 进度条
        const bar = new ProgressBar(
          `${section.title} 下载中：[:bar] :percent :current/:total 耗时：:elapsed秒 `,
          {
            complete: "=",
            incomplete: " ",
            width: 20,
            total: section.images.length,
          }
        );

        // 刷新bar耗时
        const timerId = setInterval(() => {
          bar.render();
          if (bar.complete) {
            clearInterval(timerId);
          }
        }, 1000);

        for (const image of section.images) {
          for (const [index, href] of image.hrefs.entries()) {
            try {
              await new HhimmImageSpider(href).crawl(
                `${process.cwd()}/download/${comic.title}/${section.title}`,
                image.page
              );
              bar.tick();
              break;
            } catch (error) {
              if (index === image.hrefs.length - 1) {
                throw error;
              }
              console.log(chalk.yellow(`切换节点 ${index + 1}`));
            }
          }
        }
      }
      console.log(chalk.yellow(`${comic.title} 下载完成 ~`));
      process.exit(0);
    });
}

async function main() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "crawlType",
        message: "请选择指令类型：\n",
        choices: [
          {
            name: "Search 查找名称",
            value: "search",
          },
          {
            name: "URL 爬取章节",
            value: "url",
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
              if (comics.length === 0) {
                throw new Error("没有找到任何内容");
              } else {
                console.log(chalk.blue(info));
              }
              // 给命令行提供查找行为
              return comics;
            })
            .then((comics) => {
              // 选项
              const choices = comics.map((c, index) => {
                const title =
                  c.title.length > 20
                    ? c.title.substring(0, 20) + "..."
                    : c.title;
                return {
                  name:
                    `[${index + 1}]` + title + chalk.green(` 预览：${c.href} `),
                  value: c.href,
                };
              });
              return inquirer.prompt([
                {
                  type: "list",
                  name: "inputURL",
                  message: "请选择你想下载的漫画：\n",
                  choices,
                  pageSize: 30,
                },
              ]);
            })
            .then(sectionQuery);
        },
      };
      return actions[crawlType]();
    })
    .catch((err) => {
      console.error(chalk.red(err));
      process.exit(1);
    });
}

main();
