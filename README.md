# Plain HTTP JSON Client

a purpose-built http api client in universal javascript (isomorphic)

[![license][license-img]][license-url]
[![release][release-img]][release-url]
[![super linter][super-linter-img]][super-linter-url]
[![test][test-img]][test-url]
[![semantic][semantic-img]][semantic-url]

## Why

General purpose HTTP client libraries tend to do everything you will ever need for making HTTP calls,
however, if you're building within the confines of your application stack, the likelihood that you will need anything outside the expected architecture of your applicaiton is very low.

## What

This client provides a promise based api, to send and recieve JSON data. **and nothing else**.

## How

### import / require

``` js
// using JS Modules
import http from '@ahmadnassri/plain-http'

// or using CommonJS:
const http = require('@ahmadnassri/plain-http')
```

There's also a UMD bundle available as `/dist/index.umd.js`

``` html
<script src="https://unpkg.com/@ahmadnassri/plain-http"></script>
<script>
  http({ path: '/' })
</script>
```

#### With tree-shaking

You can get even more selective, and skip the browser/node detection, import the version you need directly to further optimize the final bundle size:

``` js
import { node, browser } from '@ahmadnassri/plain-http'
```

### Usage

``` js
const options = { host: 'httpbin.org', method: 'GET', path: '/get', body: { foo: 'bar' } }
const response = await http(options)
```

### `options`

| property   | required | type      | default     | description                                        |
|------------|----------|-----------|-------------|----------------------------------------------------|
| `method`   | ✖        | `string`  | `GET`       | a string specifying the http request method        |
| `host`     | ✖        | `string`  | `localhost` | a domain name or ip address of the server          |
| `path`     | ✖        | `string`  | `/`         | request path. *should include query string if any* |
| `headers`  | ✖        | `object`  | `{}`        | an object containing request headers               |
| `protocol` | ✖        | `string`  | `https`     | protocol to use                                    |
| `port`     | ✖        | `integer` | `443`       | port of remote server                              |
| `body`     | ✖        | `any`     | \`\`        | request body                                       |

### `response`

| property        | type      | description                                        |
|-----------------|-----------|----------------------------------------------------|
| `headers`       | `object`  | The response headers object                        |
| `statusCode`    | `integer` | The 3-digit HTTP response status code              |
| `statusMessage` | `string`  | The HTTP response status message *(reason phrase)* |

----
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull;
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/node-plain-http

[release-url]: https://github.com/ahmadnassri/node-plain-http/releases
[release-img]: https://badgen.net/github/release/ahmadnassri/node-plain-http

[super-linter-url]: https://github.com/ahmadnassri/node-plain-http/actions?query=workflow%3Asuper-linter
[super-linter-img]: https://github.com/ahmadnassri/node-plain-http/workflows/super-linter/badge.svg

[test-url]: https://github.com/ahmadnassri/node-plain-http/actions?query=workflow%3Atest
[test-img]: https://github.com/ahmadnassri/node-plain-http/workflows/test/badge.svg

[semantic-url]: https://github.com/ahmadnassri/node-plain-http/actions?query=workflow%3Arelease
[semantic-img]: https://badgen.net/badge/📦/semantically%20released/blue
