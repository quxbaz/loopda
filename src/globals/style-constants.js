const d = document

const constants = {}

function getValue(stage, className, cssProp) {
  let el = d.createElement('div')
  el.className = className
  stage.appendChild(el)
  let value = getComputedStyle(el).getPropertyValue(cssProp)
  let parsedValue = parseInt(value)
  stage.removeChild(el)
  return parsedValue === NaN ? value : parsedValue
}

export function computeStyles() {

  let stage = d.createElement('div')
  stage.style.display = 'none'
  d.body.appendChild(stage)

  let compute = (...args) => getValue(stage, ...args)

  Object.assign(constants, {
    blipWidth: compute('blip', 'width')
  })

  stage.parentNode.removeChild(stage)

}

export default constants
