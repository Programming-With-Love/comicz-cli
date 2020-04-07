/* 
测试用地址：
http://www.hhimm.com/manhua/41544.html
*/
// const host = "www.hhimm.com";
const host = "localhost:8080";

const comicURL = `http://${host}/manhua/41544.html`;
const detailURL = `http://${host}/cool385029/1.html?s=3`;

const ComicHhimmSpider = require("../src/spider/ComicHhimmSpider.js");
const Comic = require("../src/entity/Comic.js");

// URL.href
let comic = new Comic();
const chs = new ComicHhimmSpider(comicURL);
chs.crawl();
