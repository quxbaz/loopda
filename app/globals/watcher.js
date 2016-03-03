import Sentry from 'sentry';

let watcher = new Sentry();

watcher.include = function(watchable) {
  watchable.on('change', () => {
    this.trigger('change');
  });
};

export default watcher;
