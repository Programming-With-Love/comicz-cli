async function section() {
  const sectionURL = "http://0.0.0.0:8080/202010/467850.html";
  const SevenSevenMhSectionSpider = require("../src/spider/77mh/SevenSevenMhSectionSpider.js");
  const spider = new SevenSevenMhSectionSpider(sectionURL);
  const imgs = await spider.crawl();
  console.log(imgs);
}
// section();

async function download() {
  const SevenSevenMhImageSpider = require("../src/spider/77mh/SevenSevenMhImageSpider.js");
  const imgURL = "https://a16d.gdbyhtl.net:64443/h61/202010/14/1553166200.jpg";
  const spider = new SevenSevenMhImageSpider(imgURL);
  await spider.crawl(`${process.cwd()}/comic/`, 1);
}
// download();

async function detail() {
  const detailURL = "http://0.0.0.0:8080/colist_245895.html";
  const SevenSevenMhDetailSpider = require("../src/spider/77mh/SevenSevenMhDetailSpider.js");
  const spider = new SevenSevenMhDetailSpider(detailURL);
  const detail = await spider.crawl();
  console.log(detail);
}
// detail();

async function search() {
  const SevenSevenMhSearchSpider = require("../src/spider/77mh/SevenSevenMhSearchSpider");
  const searchURL = "http://192.168.33.112:8080/search.html";
  const spider = new SevenSevenMhSearchSpider(searchURL);
  const search = await spider.crawl();
  console.log(search);
}
search();
