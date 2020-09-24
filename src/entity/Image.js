module.exports = class Image {
  /**
   * 构造函数
   * @param {*} page 第几页
   * @param {*} [hrefs=[]] 图片源
   */
  constructor(page, hrefs = []) {
    this.page = page;
    this.hrefs = hrefs;
  }
};
