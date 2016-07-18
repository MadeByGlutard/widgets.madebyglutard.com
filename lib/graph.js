'use strict'

import fetch from './fetch'

const host = 'https://graph.facebook.com'
const data = ({ json, response }) => ({ data: json.data, json, response })

export default (path, options) => fetch(`${host}${path}`, { data: options }).then(data)
