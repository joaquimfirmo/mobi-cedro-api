const ScheduleRepository = require('./schedule-repository')
const Connection = require('../../infrastructure/database/connection')
const Pool = require('../../infrastructure/database/pool')

describe('testes schedule repository', () => {
  test('Deve listar todos os horarios', async () => {
    const pool = Pool.create()
    const connection = new Connection(pool)
    await connection.connect()
    const schedulesRepository = new ScheduleRepository(connection)
    const schedules = await schedulesRepository.all()
    expect(schedules).toHaveLength(1)
  })
})
