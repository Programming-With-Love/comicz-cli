const EventEmitter = require("events");
const { URL } = require("url");

class Spider extends EventEmitter {
  constructor(url) {
    super();
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
