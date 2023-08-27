const Hapi = require('@hapi/hapi')
const scheduleRoutes = require('./interfaces/routes/schedule')

const initServer = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
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
