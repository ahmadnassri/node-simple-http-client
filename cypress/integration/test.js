const http = require('../../dist/index')
const assert = require('assert')

const host = 'httpbin.org'

const methods = [
  { host, method: 'GET', path: '/get' },
  { host, method: 'POST', path: '/post' },
  { host, method: 'DELETE', path: '/delete' },
  { host, method: 'PATCH', path: '/patch' },
  { host, method: 'PUT', path: '/put' }
]

describe('simple http client', () => {
  context('script', () => {
    it('script is loaded', () => {
      assert.strictEqual(typeof http, 'function')
    })
  })

  context('methods', () => {
    for (const options of methods) {
      it(`can ${options.method}`, async () => {
        const res = await http(options)
        assert.strictEqual(typeof res, 'object')
        assert.strictEqual(res.statusCode, 200)
        assert.strictEqual(res.body.url, `https://httpbin.org/${options.method.toLowerCase()}`)
      })
    }
  })

  context('headers', () => {
    it('can set accept headers', async () => {
      const res = await http({ host, method: 'GET', path: '/headers' })
      assert.strictEqual(typeof res, 'object')
      assert.strictEqual(typeof res.body.headers, 'object')
      assert.strictEqual(res.body.headers.Accept, 'application/json')
    })

    it('can set content-type header', async () => {
      const res = await http({ host, method: 'GET', path: '/headers', body: { foo: 'bar' } })
      assert.strictEqual(typeof res, 'object')
      assert.strictEqual(typeof res.body.headers, 'object')
      assert.strictEqual(res.body.headers['Content-Type'], 'application/json')
    })

    it('can set custom headers', async () => {
      const res = await http({ host, method: 'GET', path: '/headers', headers: { foo: 'bar' } })
      assert.strictEqual(typeof res, 'object')
      assert.strictEqual(typeof res.body.headers, 'object')
      assert.strictEqual(res.body.headers.Foo, 'bar')
    })
  })

  context('body', () => {
    it('can send and recieve json', async () => {
      const res = await http({ host, method: 'POST', path: '/post', body: { foo: 'bar' } })
      assert.strictEqual(typeof res.body.data, 'string')
      assert.strictEqual(res.body.data, '{"foo":"bar"}')
      assert.strictEqual(typeof res.body.json, 'object')
      assert.strictEqual(res.body.json.foo, 'bar')
    })
  })

  context('compression', () => {
    it('can send handle brotli compression', async () => {
      const res = await http({ host, method: 'GET', path: '/brotli' })
      assert.strictEqual(typeof res.body.brotli, 'boolean')
      assert.strictEqual(res.body.brotli, true)
    })

    it('can send handle deflate compression', async () => {
      const res = await http({ host, method: 'GET', path: '/deflate' })
      assert.strictEqual(typeof res.body.deflated, 'boolean')
      assert.strictEqual(res.body.deflated, true)
    })

    it('can send handle gzip compression', async () => {
      const res = await http({ host, method: 'GET', path: '/gzip' })
      assert.strictEqual(typeof res.body.gzipped, 'boolean')
      assert.strictEqual(res.body.gzipped, true)
    })
  })
})
