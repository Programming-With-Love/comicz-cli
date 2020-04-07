module.exports = class Section {
  constructor(title, href, images = []) {
    this.title = title;
    this.href = href;
    this.images = images;
  }
};
