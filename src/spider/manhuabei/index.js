const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");
const ProgressBar = require("progress");

const { Comic, Section, Image } = require("../../entity/index.js");
const ManhuabeiImageSpider = require("./ManhuabeiImageSpider.js");
const ManhuabeiSearchSpider = require("./ManhuabeiSearchSpider.js");
const ManhuabeiDetailSpider = require("./ManhuabeiDetailSpider.js");
const ManhuabeiSectionSpider = require("./ManhuabeiSectionSpider.js");

function manhuabeiCli() {
  const comic = new Comic();
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
      const searchURL = `https://www.manhuabei.com/search/?keywords=${inputSearch}`;
      const spinner = ora("查找中...\n").start();
      const { info, comics } = await new ManhuabeiSearchSpider(
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
          c.title.length > 20 ? c.title.substring(0, 20) + "..." : c.title;
        return {
          name: `[${index + 1}]` + title + chalk.green(` 地址：${c.href} `),
          value: c.href,
        };
      });
      return inquirer.prompt([
        {
          type: "list",
          name: "inputURL",
          message: "请选择你想下载的漫画：\n",
          choices,
          pageSize: 36,
        },
      ]);
    })
    .then(async ({ inputURL }) => {
      // 执行爬取漫画详情
      const spinner = ora("爬取所选漫画并解析中...").start();
      try {
        const { title, href, sections } = await new ManhuabeiDetailSpider(
          inputURL
        ).crawl();
        comic.title = title;
        comic.href = href;
        comic.sections = sections.map(
          (section) => new Section(section.title, section.href)
        );
        if (sections.length === 0) {
          throw new Error("没有找到漫画的章节内容");
        }
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
          const images = await new ManhuabeiSectionSpider(section.href).crawl();
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
            await new ManhuabeiImageSpider(href).crawl(
              `${process.cwd()}/download/${comic.title}/${section.title}`,
              image.page
            );
            bar.tick();
          }
        }
      }
      console.log(chalk.yellow(`${comic.title} 下载完成 ~`));
      process.exit(0);
    });
}

module.exports = {
  ManhuabeiImageSpider,
  ManhuabeiSectionSpider,
  ManhuabeiDetailSpider,
  ManhuabeiSearchSpider,
  manhuabeiCli,
};
