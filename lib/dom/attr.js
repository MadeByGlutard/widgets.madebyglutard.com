'use strict'

export default ($element) => (attribute, value) => {
  if (value !== undefined) $element.setAttribute(attribute, value)
  return $element.getAttribute(attribute)
}
