const EventEmitter = require("events");
class CounterEmitter extends EventEmitter {
  constructor(max = 100) {
    super();
    this.count = 0;
    this.max = max;
  }
}

module.exports = CounterEmitter;
