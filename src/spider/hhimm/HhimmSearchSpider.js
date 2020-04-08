const Spider = require("../Spider.js");
const request = require("../../../utils/request.js");
const cheerio = require("cheerio");

class HhimmSearchSpider extends Spider {
  async crawl() {
    const response = await request.get(this.url.href);
    return this._parse(response.data);
  }

  _parse(data) {
    const $ = cheerio.load(data);
    $("div#list div.cMBR_Title *").empty();
    const info = $("div#list div.cMBR_Title").text().trim();
    console.log(info);
    const comicsDOM = $("div#list div.cComicList li a").toArray();
    const comics = comicsDOM.map((dom) => {
      const aDOM = $(dom);
      const title = aDOM.text().trim();
      const href = aDOM.attr("href");
      const previewLink = $("img", aDOM).attr("src");
      return {
        title,
        href: this.url.origin + href,
        previewLink,
      };
    });
    return {
      info,
      comics,
    };
  }
}

module.exports = HhimmSearchSpider;
