const Spider = require("../Spider.js");
const cheerio = require("cheerio");
const request = require("../../../utils/request.js");

class ManhuabeiSearchSpider extends Spider {
  async crawl() {
    const response = await request.get(this.url.href);
    const $ = cheerio.load(response.data);
    const info = `${$(".comi_num")
      .text()
      .replace(/\s/g, "")}，仅显示前36条数据`;
    const comics = $(".search_con .list_con_li .list-comic>a")
      .map((i, el) => {
        const title = $(el).attr("title").trim();
        const href = $(el).attr("href");
        return {
          title,
          href,
          previewLink: href,
        };
      })
      .get();
    return {
      info,
      comics,
    };
  }
}

module.exports = ManhuabeiSearchSpider;
