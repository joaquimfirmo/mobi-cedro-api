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
    path: '/horarios/{city}',
    handler: scheduleController.findSchedulesByCity,
    options: {
      description: 'Lista todos os horários de uma cidade',
      tags: ['api'],
    },

    method: 'POST',
    path: '/horarios',
    handler: scheduleController.create,
    options: {
      description: 'Cria um novo horário',
      tags: ['api'],
    },
  },
]
