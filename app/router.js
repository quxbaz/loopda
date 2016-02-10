/*
  router.js
*/

import {Router} from 'director';

let routes = {};

export function setRoute(path, handlers) {
  routes[path] = handlers;
};

export function startRouter() {
  Router(routes).init();
};
