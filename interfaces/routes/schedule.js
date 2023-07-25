const ScheduleController = require('../controllers/schedule-controller')

const scheduleController = new ScheduleController()

module.exports = [
  {
    method: 'GET',
    path: '/horarios',
    handler: scheduleController.all,
    options: {
      description: 'Lista todos os horários',
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/horarios/{id}',
    handler: scheduleController.find,
    options: {
      description: 'Lista um horário pelo id',
      tags: ['api'],
    },
  },

  {
    method: 'DELETE',
    path: '/horario/{id}',
    handler: scheduleController.delete,
    options: {
      description: 'Deleta um horário pelo id',
      tags: ['api'],
    },
  },
]
