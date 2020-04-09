/* 
测试用地址：
http://www.hhimm.com/manhua/41544.html
*/

const {
  HhimmDetailSpider,
  HhimmSectionSpider,
} = require("../src/spider/hhimm/index.js");
const Comic = require("../src/entity/Comic.js");
const Section = require("../src/entity/Section.js");

// const host = "www.hhimm.com";
const host = "localhost:8080";
const comicURL = `http://${host}/manhua/41544.html`;
const detailURL = `http://${host}/cool385029/1.html?s=3`;

let comic = new Comic();

// url 类型
const hds = new HhimmDetailSpider(comicURL);
hds.crawl().then(({ title, href, sections }) => {
  comic.title = title;
  comic.href = href;
  comic.sections = sections.map(
    (section) => new Section(section.title, section.href)
  );
});

const hss = new HhimmSectionSpider(detailURL);
hss.crawl();
