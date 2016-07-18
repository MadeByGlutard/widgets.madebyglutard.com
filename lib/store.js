'use strict'

import store from 'store'
import isToday from 'date-fns/is_today'

// const get = (obj, key) => Object.assign(obj, store.get(obj.id))[key]
// const set = (obj, key, val) => store.set(obj.id, Object.assign(obj, store.get(obj.id), { [key]: val }))

const get = (obj, key) => {
  let state = (store.get(obj.id) || {})[key]
  let cached = state && isToday(state.cache)
  return Object.assign(obj, { [key]: cached ? state.val : undefined })[key]
}
const set = (obj, key, val) => {
  let state = store.get(obj.id)
  let update = { [key]: { val, cache: new Date } }
  store.set(obj.id, Object.assign({}, state, update))
  return Object.assign(obj, { [key]: val })
}

export default (id) => new Proxy({ id }, { get, set })
