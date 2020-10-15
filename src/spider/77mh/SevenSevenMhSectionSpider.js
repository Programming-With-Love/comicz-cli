const Spider = require("../Spider.js");
const cheerio = require("cheerio");
const request = require("../../../utils/request.js");

class SevenSevenMhSectionSpider extends Spider {
  async crawl() {
    try {
      return await request.get(this.url.href).then(async (response) => {
        const $ = cheerio.load(response.data);
        const scripts = $("script").filter((i, el) => {
          const script = $(el);
          const src = script.attr("src");
          const html = script.html();
          return src === undefined && html.includes("eval(");
        });
        if (scripts.length !== 1) {
          throw new Error("此爬虫已失效");
        }
        let script = $(scripts[0]).html();
        script = script.replace(/\|?var/g, "| ");
        // 以下参数虽不使用，但需要定义
        let maxPage;
        let preLink_b;
        let preName_b;
        let nextLink_b;
        let nextName_b = "";
        let linkname = "";
        let linkn_z = "";
        // 解密须要用到的参数
        let atsvr;
        let msg; // 图片uri
        let img_s;
        let link_z;
        eval(script);
        let cid = /\/colist_(\d+)\.html/.exec(link_z)[1];
        let coid_num = /\d+\/(\d+)/.exec(this.url.pathname)[1];
        const host = `https://shcss.gdbyhtl.net`;
        const pathname =
          atsvr === "hw" ? "/img_v1/hw2_svr.aspx" : "/img_v1/cn_svr.aspx";
        const requestParams = `?z=${atsvr}&s=${img_s}&cid=${cid}&coid=${coid_num}`;

        const imgPathname = await request
          .get(`${host}${pathname}${requestParams}`)
          .then((res) => {
            let script = res.data.replace(/var /g, " ");
            let img_qianzso;
            let webpshow;
            eval(script);
            return img_qianzso[img_s];
          });

        const imgs = msg.split("|").map((img, index) => {
          return {
            page: index + 1,
            hrefs: [`${imgPathname}${img}`],
          };
        });
        return imgs;
      });
    } catch (error) {
      console.error(error);
      throw new Error("此爬虫已失效");
    }
  }
}

module.exports = SevenSevenMhSectionSpider;
