const Spider = require("../Spider.js");
const cheerio = require("cheerio");
const request = require("../../../utils/request.js");

class SevenSevenMhDetailSpider extends Spider {
  async crawl() {
    const { data } = await request.get(this.url.href);
    const $ = cheerio.load(data);
    const title = $("ul.ar_list_coc>li>h1").text().trim();
    const sections = $("ul.ar_rlos_bor.ar_list_col>li>a").map((i, el) => {
      const title = $(el).text().trim();
      const href = `${this.url.origin}${$(el).attr("href")}`;
      return { title, href };
    });
    return { title, sections: Array.from(sections) };
  }
}

module.exports = SevenSevenMhDetailSpider;
