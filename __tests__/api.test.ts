import createServer from '../src/infrastructure/server'
import Booststrap from '../src/infrastructure/booststrap'

import request from 'supertest'

describe('API', () => {
  let server: any

  beforeAll(async () => {
    await Booststrap.run()
    server = await createServer()
  })

  afterAll(async () => {
    await Booststrap.stop()
    await server.stop()
  })

  it('should return 200 when the route is /transportes', async () => {
    const response = await request(server.listener).get('/transportes')
    expect(response.statusCode).toEqual(200)
    expect(response.body).not.toBeNull()
    expect(response.body).toEqual(
      expect.objectContaining({
        rowCount: expect.any(Number),
        rows: expect.arrayContaining([
          expect.objectContaining({
            cidade_origem: expect.any(String),
            cidade_destino: expect.any(String),
            nome: expect.any(String),
            veiculo: expect.any(String),
            hora_saida: expect.any(String),
            hora_chegada: expect.any(String),
          }),
        ]),
      })
    )
  })

  it('should return 200 with the transport options in the selected city on the route is /transportes/{city}', async () => {
    const response = await request(server.listener).get('/transportes/Cedro-CE')
    expect(response.statusCode).toEqual(200)
    expect(response.body).not.toBeNull()
    expect(response.body).toEqual(
      expect.objectContaining({
        rowCount: expect.any(Number),
        rows: expect.arrayContaining([
          expect.objectContaining({
            cidade_origem: 'Cedro-CE',
            cidade_destino: expect.any(String),
            nome: expect.any(String),
            veiculo: expect.any(String),
            hora_saida: expect.any(String),
            hora_chegada: expect.any(String),
          }),
        ]),
      })
    )
  })
})
