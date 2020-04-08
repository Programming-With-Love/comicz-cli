const { URL } = require("url");

class Spider {
  constructor(url) {
    this.url = new URL(url);
  }

  /**
   * 爬取
   *
   * @memberof Spider
   */
  async crawl() {}
}

module.exports = Spider;
