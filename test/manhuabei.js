async function section() {
  const sectionURL = "http://192.168.33.112:8080/section.html";
  const ManhuabeiSectionSpider = require("../src/spider/manhuabei/ManhuabeiSectionSpider.js");
  const spider = new ManhuabeiSectionSpider(sectionURL);
  const images = await spider.crawl();
  images.forEach((image) => {
    console.log(image.hrefs[0]);
  });
}

section();

async function detail() {
  const detailURL = "http://192.168.33.112:8080/detail.html";
  const ManhuabeiDetailSpider = require("../src/spider/manhuabei/ManhuabeiDetailSpider.js");
  const spider = new ManhuabeiDetailSpider(detailURL);
  const detail = await spider.crawl();
  console.log(detail);
}

async function search() {
  const ManhuabeiSearchSpider = require("../src/spider/manhuabei/ManhuabeiSearchSpider.js");
  const searchURL = "http://192.168.33.112:8080/search.html";
  const spider = new ManhuabeiSearchSpider(searchURL);
  const search = await spider.crawl();
  console.log(search);
}

async function download() {
  const ManhuabeiImageSpider = require("../src/spider/manhuabei/ManhuabeiImageSpider.js");
  const imgURL = "https://f.mlxsc.com/images/cover/202007/15935830580911594494833b61.jpg";
  const spider = new ManhuabeiImageSpider(imgURL);
  await spider.crawl(`${process.cwd()}/download/`, 1);
}

