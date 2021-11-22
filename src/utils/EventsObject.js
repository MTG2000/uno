export class EventsObject {
  events = {};

  addEventListener = function (name, handler) {
    if (this.events.hasOwnProperty(name)) this.events[name].push(handler);
    else this.events[name] = [handler];
  };

  removeEventListener = function (name, handler) {
    /* This is a bit tricky, because how would you identify functions?
           This simple solution should work if you pass THE SAME handler. */
    if (!this.events.hasOwnProperty(name)) return;

    var index = this.events[name].indexOf(handler);
    if (index !== -1) this.events[name].splice(index, 1);
  };

  removeAllListeners() {
    this.events = {};
  }

  fireEvent(name, ...args) {
    if (!this.events.hasOwnProperty(name)) return;

    if (!args) args = [];

    var evs = this.events[name],
      l = evs.length;

    for (var i = 0; i < l; i++) {
      evs[i](...args);
    }
  }
}
