import { ServerRoute } from '@hapi/hapi'
import { ScheduleController } from '../controllers/schedule-controller'

export const schedulesRoutes: Array<ServerRoute> = [
  {
    method: 'GET',
    path: '/horarios',
    handler: new ScheduleController().getSchedule,
  },
]
