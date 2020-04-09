const Spider = require("../Spider.js");
const request = require("../../../utils/request.js");
const cheerio = require("cheerio");

/**
 * 爬取章节具体内容
 *
 * @class HhimmSectionSpider
 * @extends {Spider}
 */
class HhimmSectionSpider extends Spider {
  /**
   * 爬取章节及其图片组
   *
   * @returns
   * @memberof HhimmSectionSpider
   */
  async crawl() {
    let images = [];
    const response = await request.get(this.url.href);
    const pageURLs = this._parseSectionPages(response.data);
    for (const [index, pageURL] of pageURLs.entries()) {
      const { data } = await request.get(pageURL);
      images.push({ page: index + 1, href: this._parseImagePage(data) });
    }
    return images;
  }

  /**
   * 解析章节详情页
   *
   * @returns
   * @memberof HhimmSectionSpider
   */
  _parseSectionPages(data) {
    const $ = cheerio.load(data);
    const title = $("title").text().split("-").shift().trim();
    // 取得有多少页地址
    const totalPage = +$("div.cHeader div.cH1 b")
      .text()
      .split("/")
      .pop()
      .trim();
    const sID = $("#hdVolID").attr("value");
    const s = $("#hdS").attr("value");

    // 取每一页的网址
    let pageURLs = [];
    for (let page = 1; page <= totalPage; page++) {
      pageURLs.push(`${this.url.origin}/cool${sID}/${page}.html?s=${s}&d=0`);
    }

    return pageURLs;
  }

  /**
   * 解析图片页
   *
   * @param {*} data
   * @returns
   * @memberof HhimmSectionSpider
   */
  _parseImagePage(data) {
    let $ = cheerio.load(data);
    // 节点
    const node = $("#hdDomain").attr("value").split("|");
    // const idx = Math.floor(Math.random() * node.length);
    const idx = 0;
    const encryptStr = $("#iBodyQ img").attr("name");
    const decryptStr = this._decrypt(encryptStr);
    return `${node[idx]}${decryptStr}`;
  }

  /**
   * 解密图片路径
   * @param {string} hhimm img attr name
   * @returns url
   * @memberof HhimmSectionSpider
   */
  _decrypt(s) {
    let x = s.substring(s.length - 1);
    let w = "abcdefghijklmnopqrstuvwxyz";
    let xi = w.indexOf(x) + 1;
    let sk = s.substring(s.length - xi - 12, s.length - xi - 1);
    s = s.substring(0, s.length - xi - 12);
    let k = sk.substring(0, sk.length - 1);
    let f = sk.substring(sk.length - 1);
    for (let i = 0; i < k.length; i++) {
      eval("s=s.replace(/" + k.substring(i, i + 1) + "/g,'" + i + "')");
    }
    let ss = s.split(f);
    s = "";
    for (let i = 0; i < ss.length; i++) {
      s += String.fromCharCode(ss[i]);
    }
    return s;
  }
}

module.exports = HhimmSectionSpider;