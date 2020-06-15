import config from './config'

export default function http (options) {
  // configure default options
  options = config(options)

  return new Promise((resolve, reject) => {
    // create new xhr object
    const xhr = new XMLHttpRequest()

    // assign event listeners
    // TODO pass structured object here
    xhr.addEventListener('error', reject)
    xhr.addEventListener('abort', reject)

    xhr.addEventListener('load', function handler () {
      const response = {
        headers: {},
        body: xhr.response,
        statusCode: xhr.status,
        statusMessage: xhr.statusText
      }

      // create header object
      xhr.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, (_, key, value) => {
        response.headers[key] = value
      })

      resolve(response)
    })

    // construct full url
    options.url = `${options.protocol}://${options.host}:${options.port}${options.path}`

    // initialize a new request
    xhr.open(options.method, options.url, true)

    // allow for CORS requests
    xhr.withCredentials = true

    // expect response to be JSON
    xhr.responseType = 'json'

    // assign headers
    for (const header in options.headers) {
      xhr.setRequestHeader(header, options.headers[header])
    }

    // send request with body
    xhr.send(options.body)
  })
}
