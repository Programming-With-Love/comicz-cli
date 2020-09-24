const Spider = require("../Spider.js");
const cheerio = require("cheerio");
const request = require("../../../utils/request.js");
const decrypt = require("./utils/decrypt.js");

/**
 * 具体爬取页
 *
 * @class ManhuabeiSectionSpider
 * @extends {Spider}
 */
class ManhuabeiSectionSpider extends Spider {
  /**
   * 爬取
   *
   * @memberof Spider
   */
  async crawl() {
    try {
      const { chapterImagesEncrypt, chapterPath } = await request
        .get(this.url.href)
        .then((response) => {
          const $ = cheerio.load(response.data);
          const scripts = $("script").filter((i, el) => {
            const script = $(el);
            const src = script.attr("src");
            const html = script.html();
            return src === undefined && html.includes("var chapterImages");
          });
          if (scripts.length !== 1) {
            throw new Error("此爬虫已失效");
          }

          const script = $(scripts[0]).html();
          const chapterImagesRegex = /var chapterImages = "([a-zA-Z0-9\/\+=]+)";/g;
          const chapterImagesEncrypt = chapterImagesRegex.exec(script)[1];

          const chapterPathRegex = /var chapterPath = "([a-zA-Z0-9\/\+=]+)";/g;
          const chapterPath = chapterPathRegex.exec(script)[1];

          return { chapterImagesEncrypt, chapterPath };
        });

      // 取图片服务器域
      const domain = await request
        .get(`${this.url.origin}/js/config.js`)
        .then((response) => {
          const script = response.data;
          const scriptLine = script
            .split("\n")
            .find((line) => line.includes("resHost"));
          return /(https?:\/\/[a-zA-Z0-9\.\/]+)/g.exec(scriptLine)[1];
        });
      const images = decrypt(domain, chapterPath, chapterImagesEncrypt);
      return images.map((href, index) => ({ page: index + 1, hrefs: [href] }));
    } catch (error) {
      console.error(error);
      throw new Error("此爬虫已失效");
    }
  }
}

module.exports = ManhuabeiSectionSpider;
