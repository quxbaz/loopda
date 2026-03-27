import values from 'qux/lib/values'

const getAll = (state) => values(state.mixables)

const getById = (id) => (state) => state.mixables[id]

export default {getAll, getById}
