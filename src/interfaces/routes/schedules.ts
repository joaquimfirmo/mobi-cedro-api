import { ServerRoute } from '@hapi/hapi'
import ScheduleController from '../controllers/schedule-controller'

export const schedulesRoutes: Array<ServerRoute> = [
  {
    method: 'GET',
    path: '/horarios',
    handler: ScheduleController.getSchedules.bind(ScheduleController),
  },
  // {
  //   method: 'GET',
  //   path: '/horarios/{city}',
  //   handler: ScheduleController.findSchedulesByCity,
  // },
]
