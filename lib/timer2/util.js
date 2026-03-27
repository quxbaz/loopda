const has = (obj, key) => obj.hasOwnProperty(key)

const now = () => performance.now()

const checkBrowserSupport = () => {
  const features = ['Blob', 'Worker', 'URL', 'performance']
  features.forEach((feature) => {
    if (self[feature] === undefined)
      throw new Error(`${feature} is not supported this browser.`)
  })
}

export {
  has, now,
  checkBrowserSupport,
}
