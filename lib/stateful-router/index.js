import React, { createContext, useContext, Children, cloneElement, isValidElement } from 'react'

const RouterContext = createContext('')

function matchRoute(path, route) {
  // Exact match when route ends with /
  const exact = route.endsWith('/') && route.length > 1
  const routePattern = exact ? route.slice(0, -1) : route

  const routeParts = routePattern.split('/').filter(Boolean)
  const pathParts = path.split('/').filter(Boolean)

  if (exact && pathParts.length !== routeParts.length) return null
  if (pathParts.length < routeParts.length) return null

  const params = {}
  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      params[routeParts[i].slice(1)] = pathParts[i]
    } else if (routeParts[i] !== pathParts[i]) {
      return null
    }
  }
  return params
}

export function Router({ path, children }) {
  return (
    <RouterContext.Provider value={path}>
      {children}
    </RouterContext.Provider>
  )
}

export function Route({ route, children }) {
  const path = useContext(RouterContext)

  const routes = Array.isArray(route) ? route : [route]
  let params = null
  for (const r of routes) {
    params = matchRoute(path, r)
    if (params) break
  }

  if (!params) return null

  const hasParams = Object.keys(params).length > 0
  if (!hasParams) return <>{children}</>

  return (
    <>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, params)
        }
        return child
      })}
    </>
  )
}

export default { Router, Route }
