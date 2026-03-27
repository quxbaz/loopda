import React, { createContext, useContext, Children, cloneElement, isValidElement } from 'react'

const RouterContext = createContext({ path: '', consumed: 0 })

function matchRoute(fullPath, route, consumed) {
  // Exact match when route ends with /
  const exact = route.endsWith('/') && route.length > 1
  const routePattern = exact ? route.slice(0, -1) : route

  const routeParts = routePattern.split('/').filter(Boolean)
  const allParts = fullPath.split('/').filter(Boolean)
  const remaining = allParts.slice(consumed)

  if (exact && remaining.length !== routeParts.length) return null
  if (remaining.length < routeParts.length) return null

  const params = {}
  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      params[routeParts[i].slice(1)] = remaining[i]
    } else if (routeParts[i] !== remaining[i]) {
      return null
    }
  }

  return { params, consumed: consumed + routeParts.length }
}

export function Router({ path, children }) {
  return (
    <RouterContext.Provider value={{ path, consumed: 0 }}>
      {children}
    </RouterContext.Provider>
  )
}

export function Route({ route, children }) {
  const { path, consumed } = useContext(RouterContext)

  const routes = Array.isArray(route) ? route : [route]
  let result = null
  for (const r of routes) {
    result = matchRoute(path, r, consumed)
    if (result) break
  }

  if (!result) return null

  const { params, consumed: newConsumed } = result
  const hasParams = Object.keys(params).length > 0

  const inner = hasParams
    ? Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, params)
        }
        return child
      })
    : children

  return (
    <RouterContext.Provider value={{ path, consumed: newConsumed }}>
      {inner}
    </RouterContext.Provider>
  )
}

export default { Router, Route }
