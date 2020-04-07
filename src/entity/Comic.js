module.exports = class Comic {
  constructor(title, href, sections = []) {
    this.title = title;
    this.href = href;
    this.sections = sections;
  }
};
