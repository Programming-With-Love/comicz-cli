const Spider = require("../Spider.js");
const request = require("../../../utils/request.js");
const cheerio = require("cheerio");
/**
 * 解析整本漫画所有章节信息
 *
 * @class ComicHhimmSpider
 * @extends {Spider}
 */
class HhimmDetailSpider extends Spider {
  async crawl() {
    const response = await request.get(this.url.href);
    return {
      href: this.url.href,
      ...this._parse(response.data),
    };
  }

  _parse(data) {
    // 大标题
    const $ = cheerio.load(data);
    const titleDOM = $("div#permalink h1 *").empty();
    const title = $("div#permalink h1").text().trim();
    // 发行类型卷
    const volUlDOM = $("div.cVolList .cVolUl").toArray();
    let sections = [];
    volUlDOM.forEach((vu) => {
      const volHrefs = $("li a", vu)
        .map((i, el) => {
          const volTitle = $(el).text();
          const volHref = $(el).attr("href");
          return {
            title: volTitle,
            href: this.url.origin + volHref,
          };
        })
        .toArray();
      sections.push(...volHrefs);
    });
    return {
      title,
      sections,
    };
  }
}

module.exports = HhimmDetailSpider;
