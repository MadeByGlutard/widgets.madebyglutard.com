'use strict'

import 'whatwg-fetch'

const url = (path, options) => {
  const method = options.method ? options.method.toLowerCase() : 'get'
  const search = '?' + Object.entries(options.data || {}).map(param).join('&')
  return path + (method === 'get' ? search : '')
}

const json = (response) => response.json().then((json) => ({ json, response }))

const param = ([key, val]) => [key, val].join('=')

export default (path, options = {}) => fetch(url(path, options), options).then(json)
