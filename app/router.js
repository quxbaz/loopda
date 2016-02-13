/*
  router.js
*/

import {Router} from 'director';

let routes = {};
let _router;

class AppRouter {

  constructor() {
    this.routes = {};
  }

  route(path, handlers) {
    routes[path] = handlers;
  }

  start() {
    this._router = Router(this.routes);
    this._router.init();
  }

}

// router.route('/index/', {
//   on: () => {

//   },
//   after: () => {

//   }
// });

let appRouter = new AppRouter();
export let route = appRouter.route.bind(appRouter);

export function setRoute(path, handlers) {
  routes[path] = handlers;
};

export function startRouter() {
  _router = Router(routes);
  _router.init();
};

export function router() {
  return _router;
}
