import Sentry from 'sentry';
import persistService from 'globals/persist-service';

class Watcher extends Sentry {

  constructor() {
    super();
    this.pipes = [];
  }

  watch(object) {
    object.on('change', () => {
      this.pipes.forEach((pipe) => {
        pipe(object);
      });
      this.trigger('change');
    });
  }

  pipe(fn) {
    this.pipes.push(fn);
  }

}

let watcher = new Watcher();
watcher.pipe(persistService);

export default watcher;
export let watch = watcher.watch.bind(watcher);
