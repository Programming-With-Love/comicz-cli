const Spider = require("../Spider.js");
const cheerio = require("cheerio");
const request = require("../../../utils/request.js");

/**
 * 详情页
 *
 * @class ManhuabeiDetailSpider
 * @extends {Spider}
 */
class ManhuabeiDetailSpider extends Spider {
  async crawl() {
    const { data } = await request.get(this.url.href);
    const $ = cheerio.load(data);
    const title = $(".comic_deCon h1").text().trim();
    const sections = [];
    $(".zj_list_con ul").each((i, el) => {
      const chapeterArr = $(el)
        .find("li>a")
        .map((j, sel) => {
          const title = $(sel).find(".list_con_zj").text().trim();
          const href = `${this.url.origin}${$(sel).attr("href")}`;
          return { title, href };
        })
        .get();
      chapeterArr.reverse();
      sections.push(...chapeterArr);
    });

    return {
      title,
      sections,
    };
  }
}

module.exports = ManhuabeiDetailSpider;
