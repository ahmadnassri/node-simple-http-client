import config from './config'
import decompress from './decompress'

export default function http (options) {
  // configure default options
  options = config(options)

  const { request } = require(options.protocol)

  // remove value to avoid clashing with internal property
  delete options.protocol

  return new Promise((resolve, reject) => {
    // create new request object
    const req = request(options)

    // assign request event listeners
    // TODO pass structured object here
    req.on('error', reject)

    req.on('response', (res) => {
      const body = []

      // assign response event listeners
      // TODO pass structured object here
      res.on('error', reject)

      res.on('data', (chunk) => body.push(chunk))

      res.on('end', async () => {
        const response = {
          headers: res.headers,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage
        }

        response.body = Buffer.concat(body)

        // handle compression
        if (/gzip|deflate|br/i.test(response.headers['content-encoding'])) {
          response.body = await decompress(response)
        }

        // parse json
        response.body = JSON.parse(response.body)

        resolve(response)
      })
    })

    // send request with body
    req.end(options.body)
  })
}
