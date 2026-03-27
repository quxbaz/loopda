import values from 'qux/lib/values'

const getAll = (state) => values(state.presets)

const getById = (id) => (state) => state.presets[id]

export default {getAll, getById}
