const Spider = require("../Spider.js");
const request = require("../../../utils/request.js");
const path = require("path");
const fse = require("fs-extra");

/**
 * 爬取图片，并存储至本地
 *
 * @class HhimmSectionSpider
 * @extends {Spider}
 */
class HhimmImageSpider extends Spider {
  /**
   * 爬取图片，存储本地
   *
   * @param {*} storeDirPath 保存的文件夹路径
   * @param {*} page 页码
   * @returns
   * @memberof HhimmImageSpider
   */
  async crawl(storeDirPath, page) {
    const response = await request({
      method: "GET",
      responseType: "stream",
      url: this.url.href,
    });
    fse.mkdirsSync(storeDirPath);
    const dest = response.data.pipe(
      fse.createWriteStream(
        `${storeDirPath}/${page}${path.extname(response.request.path)}`
      )
    );
  }
}

module.exports = HhimmImageSpider;
