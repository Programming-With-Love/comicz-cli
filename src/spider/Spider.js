const EventEmitter = require("events");
const { URL } = require("url");

class Spider extends EventEmitter {
  constructor(url) {
    super();
    this.url = new URL(url);
  }

  /**
   * 爬取
   * 复写
   * @memberof Spider
   */
  async crawl() {}

  /**
   * 解析
   * 复写
   * @param {*} data
   * @memberof Spider
   */
  _parse(data) { }
}

module.exports = Spider;
