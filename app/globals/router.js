/*
  router.js

  <TODO>
  We shouldn't have to import all our route declarations
  manually. Instead, the URL changes, we should do a
  require("/routes/my/route") and use the result to do dynamic
  routing.
*/

import ReactDOM from 'react-dom';
import {Router} from 'director';
import Sentry from 'sentry';

let routes = {};
let _router;

class Route {

  constructor(router, path, handlers) {
    this.router = router;
    this.path = path;
    Object.assign(this, handlers);
    this.resourceData = null;
  }

  resource() {return Promise.resolve()}
  setup(data) {return data}
  render(data) {}
  redirect() {}
  cleanup(data) {}

  on(...args) {
    let url = window.location.hash.substring(1);
    this.resource(...args).then((data) => {
      this.resourceData = data;
      return this.setup(data);
    }).then((data) => {
      // Only redirect if the URL matches this exact path.
      let redirect = this.redirect();
      if (redirect !== undefined && url === this.path)
        this.router.nav(redirect);
      else {

        // A very simplistic way of checking the browser URL against
        // the route path. This could break in the future.
        if (url.split('/').length !== this.path.split('/').length)
          return;

        let renderOutlet = this.render(data);
        if (renderOutlet) {
          this.router.renderOutlet = renderOutlet;
          this.router.trigger('change');
        }
      }
    });
  }

  after() {
    this.cleanup(this.resourceData);
  }

  makeRoute() {
    return {
      on: this.on.bind(this),
      after: this.after.bind(this)
    };
  }

}

class AppRouter extends Sentry {

  constructor() {
    super();
    this.routes = {};
    this._router = null;
    this.appRoute = null;
    this.renderOutlet = null;
  }

  route(path, handlers) {
    let route_ = new Route(this, path, handlers);
    if (path === 'app')
      this.appRoute = route_;
    else
      this.routes[path] = route_.makeRoute();
  }

  initAppRoute() {
    /*
      The app route must be initialized before any other routes. It is
      active throughout the entire duration of the application.
    */
    return this.appRoute.resource().then((data) => {
      return this.appRoute.setup(data);
    }).then((data) => {
      ReactDOM.render(this.appRoute.render(data), $app);
    });
  }

  start() {
    this.initAppRoute().then(() => {
      this._router = Router(this.routes).configure({
        recurse: 'forward'
      });
      this._router.init();
    });
  }

  nav(path) {
    this._router.setRoute(path);
  }

}

export let router = new AppRouter();
export let route = router.route.bind(router);
