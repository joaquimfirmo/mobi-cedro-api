const Hapi = require('@hapi/hapi')
const scheduleRoutes = require('./interfaces/routes/schedule')
require('dotenv').config()

const initServer = async () => {
  const server = Hapi.server({
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || 'localhost',
  })

  server.route(scheduleRoutes)

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('uncaughtException', (err) => {
  console.log(err)
  process.exit(1)
})

initServer()
