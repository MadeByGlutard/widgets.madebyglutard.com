'use strict'

export default (selector = '*', context = document) => [...context.querySelectorAll(selector)]
