/*
  router.js
*/

import {Router} from 'director';

let routes = {};
let _router;

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
