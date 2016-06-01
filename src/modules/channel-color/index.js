// Colors generated with PleaseJS

// const COLORS = ["#bf8072", "#ae72bf", "#729dbf", "#a072bf", "#8b72bf", "#72bfb1", "#72bf8a", "#abbf72", "#7296bf", "#bf7672", "#7282bf", "#7f72bf", "#bfb772", "#bf7e72", "#72bf76", "#bf727e", "#bf9f72", "#72b1bf", "#72a3bf", "#72bf9e", "#7296bf", "#bf72a1", "#72b2bf", "#90bf72",]
// const COLORS = ["#7fb200", "#00b28d", "#0089b2", "#00b25e", "#b20042", "#00b24f", "#b20070", "#00a8b2", "#6f00b2", "#25b200", "#b29f00", "#b23a00", "#00b24f", "#003bb2", "#00b25a", "#2500b2", "#aab200"]
// const COLORS = ["#35a6b2", "#35b23e", "#b24b35", "#35b241", "#b27635", "#a1b235", "#35b293", "#7e35b2", "#7035b2", "#35b2ae", "#83b235", "#83b235", "#96b235", "#35b254", "#b23563", "#b26335", "#35b26c", "#b28c35", "#35b26f", "#b28435", "#9cb235", "#a7b235", "#b235aa", "#35a6b2"]
// const COLORS = ["#ff4c9a", "#c4ff4c", "#acff4c", "#ff4ca6", "#ff4cc5", "#ff734c", "#4c5dff", "#4cbaff", "#ff4caa", "#ffa64c", "#d34cff", "#d3ff4c", "#9c4cff", "#7d4cff", "#ff4cfb", "#ff4c58", "#ff4cb9", "#c34cff", "#4cff97", "#854cff", "#fff74c", "#4cbeff", "#5a4cff", "#ff544c"]
// const COLORS = ["#bf3fb4", "#692164", "#642d66", "#623666", "#661862", "#6a2f6a", "#b541b9", "#a461a4", "#7a137e", "#911c97", "#923f8c", "#8e548c", "#ac4cab", "#9c49a2", "#773e74", "#9c27a0", "#9d38a6", "#794275", "#771d76", "#843585", "#7c1e81", "#683569", "#b03cb6", "#cd3cd0"]
// const COLORS = ["#e5446f", "#4475e5", "#e5ca44", "#e54f44", "#b544e5", "#44e567", "#57e544", "#e57d44", "#e5d044", "#e59544", "#e544a7", "#e54492", "#44e5c8", "#44e5c2", "#b5e544", "#b244e5", "#d044e5", "#44e5ca", "#a744e5", "#4495e5", "#e57f44", "#44e5da", "#44e5e2", "#44e5a2"]
// const COLORS = ["#cf2dcf", "#6e3f71", "#611868", "#bc25be", "#972a99", "#ce32d6", "#b325aa", "#ce2ad1", "#a261a8", "#c271bd", "#892092", "#8b408b", "#6f116e", "#772d74", "#bd27c5", "#be64b7", "#c841cc", "#793a7e", "#bd50b8", "#c631c1", "#7a1675", "#712071", "#8e4f8e", "#b230b2"]
// const COLORS = ["#e244e5", "#44e59a", "#e544c0", "#4457e5", "#e5e544", "#87e544", "#44e5ba", "#44e5dd", "#44e56a", "#4462e5", "#4482e5", "#44e5e5", "#e56444", "#9544e5", "#4c44e5", "#9de544", "#e56444", "#e5449f", "#da44e5", "#e244e5", "#afe544", "#e544bd", "#6de544", "#44e5a5"]
// const COLORS = ["#3dcc79", "#ccb63d", "#3dcc7f", "#cca03d", "#ccc03d", "#3dccb7", "#cc3d9a", "#74cc3d", "#cc8b3d", "#3dcc76", "#613dcc", "#3dcc69", "#a6cc3d", "#903dcc", "#cc3db3", "#cc3d68", "#cc493d", "#3d82cc", "#93cc3d", "#cc9a3d", "#a3cc3d", "#48cc3d", "#3dabcc", "#ccc03d"]

// const COLORS = [
//   '#F44336',
//   '#D32F2F',
//   '#4CAF50',
//   '#FF9800',
//   '#E91E63',
//   '#2196F3',
//   '#8BC34A',
//   '#FF5722',
//   '#03A9F4',
//   '#CDDC39',
//   '#795548',
// ]

const initialState = Object.freeze({

  // colors: COLORS,

  baseHue: 200,
  hueStep: 15,
  colorIndex: 0,
  currentColor: undefined,

})

const types = {
  CYCLE_COLOR: 'loopda/channel-color/CYCLE_COLOR',
}

const actions = {

  cycleColor: () => (dispatch, getState) => {
    dispatch({type: types.CYCLE_COLOR})
    return getState().channelColor.currentColor
  }

}

const reducer = (state=initialState, action) => {

  const {/*colors, */baseHue, hueStep, colorIndex} = state

  switch (action.type) {
    case types.CYCLE_COLOR:

      const hue = baseHue + (colorIndex * hueStep)

      // let hue
      // if (colorIndex % 2 === 0) {
      //   hue = baseHue + (Math.floor(colorIndex / 2) * hueStep)
      // } else {
      //   hue = 360 - (Math.floor(colorIndex / 2) * hueStep)
      // }

      return {

        ...state,

        // currentColor: colors[colorIndex],
        // colorIndex: (colorIndex + 1) % colors.length,

        currentColor: `hsl(${hue}, 100%, 70%)`,
        colorIndex: (colorIndex + 1) % ((360 - baseHue) / hueStep),

      }
    default:
      return state
  }
}

export default {actions, reducer}
