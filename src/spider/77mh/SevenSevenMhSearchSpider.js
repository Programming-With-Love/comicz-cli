const Spider = require("../Spider.js");
const cheerio = require("cheerio");
const request = require("../../../utils/request.js");

class SevenSevenMhSearchSpider extends Spider {
  async crawl() {
    const { data } = await request.get(this.url.href);
    const $ = cheerio.load(data);
    const info = $("div.ar_list_co>.so_head")
      .text()
      .trim()
      .replace("每页显示", "仅显示前");
    const comics = $(".ar_list_co>ul>dl>dd>h1>a").map((i, el) => {
      const title = $(el).text().trim();
      const href = $(el).attr("href");
      return {
        title,
        href,
        previewLink: href,
      };
    });
    return { info, comics: Array.from(comics) };
  }
}

module.exports = SevenSevenMhSearchSpider;
