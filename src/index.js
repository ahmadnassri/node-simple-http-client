import browser from './browser'
import node from './node'

export default function http (options = {}) {
  // detect Node.js
  const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null

  // determine which function to run
  return isNode ? node(options) : browser(options)
}

export { browser, node }
