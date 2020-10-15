const Spider = require("../Spider.js");
const cheerio = require("cheerio");
const request = require("../../../utils/request.js");

/**
 * 作为Spider的模板
 *
 * @class BlankSpider
 * @extends {Spider}
 */
class BlankSpider extends Spider {
  async crawl() {
    // Do crawl
  }
}

module.exports = BlankSpider;
