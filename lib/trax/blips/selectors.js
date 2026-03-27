import values from 'qux/lib/values'

const getAll = (state) => values(state.blips)

const getById = (id) => (state) => state.blips[id]

export default {getAll, getById}
