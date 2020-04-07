const Spider = require("./Spider.js");
const request = require("../../utils/request.js");
/**
 * 解析整本漫画所有章节信息
 *
 * @class ComicHhimmSpider
 * @extends {Spider}
 */
class ComicHhimmSpider extends Spider {
  async crawl() {
    request.get(this.url.href);
  }
}

module.exports = ComicHhimmSpider;
