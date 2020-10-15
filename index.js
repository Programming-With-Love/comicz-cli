const hhimm = require("./src/spider/hhimm/index.js");
const manhuabei = require("./src/spider/manhuabei/index.js");
const sevenSevenMh = require("./src/spider/77mh/index");

module.exports = { ...hhimm, ...manhuabei, ...sevenSevenMh };
