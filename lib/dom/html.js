'use strict'

export default ($element) => (html) => {
  if (html !== undefined) $element.innerHTML = html
  return $element.innerHTML
}
