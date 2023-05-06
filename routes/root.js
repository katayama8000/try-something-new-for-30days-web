'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    console.log(request)
    console.log('hello from fastify')
    return { root: true }
  })

  fastify.get('/hello', async function (request, reply) {
    return { hello: 'world' }
  })
}
