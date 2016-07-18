'use strict'

import styles from './styles.css'

import store from '../../../lib/store'
import graph from '../../../lib/graph'

import { find, attr, html } from '../../../lib/dom'
import { access_token } from '../index'

import _orderBy from 'lodash/fp/orderBy'
import _map from 'lodash/fp/map'

const state = store('MadeByGlutard.Facebook.Album')
window.state = state

const template = ({ url, name = '' }) => `<div class="${styles.photo}" title="${name}"><figure style="background-image:url(${url})"></figure></div>`

const largest = (images) => _orderBy('desc')('width')(images)[0]
const mapUrl = _map(({ name, images }) => ({ name, url: largest(images).source }))

const getPhotos = (album) => graph(`/${album}/photos`, { fields: 'name,images', limit: 100, access_token })
const mapPhotos = ({ data }) => mapUrl(data)

const getAlbum = (album) => Promise.resolve(state[album] || loadAlbum(album))
const loadAlbum = (album) => getPhotos(album).then(mapPhotos).then((photos) => (state[album] = photos))
const renderAlbum = (album) => getAlbum(album).then((photos) => photos.map(template).join(''))

const injectAlbum = ($element) => renderAlbum(attr($element)('data-album')).then(html($element))
find('[data-album]').map(injectAlbum)
