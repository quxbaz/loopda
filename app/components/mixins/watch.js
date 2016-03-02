import watcher from 'globals/watcher';

export default {

  _watchUpdate() {
    this.forceUpdate();
  },

  componentDidMount() {
    watcher.on('change', this._watchUpdate);
  },

  componentWillUnmount() {
    watcher.off('change', this._watchUpdate);
  }

};
