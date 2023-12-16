import { ServerRoute } from '@hapi/hapi'
import TransportsController from '../controllers/transports-controller'

export const transportsRoutes: Array<ServerRoute> = [
  {
    method: 'GET',
    path: '/transportes',
    handler: TransportsController.getTransports.bind(TransportsController),
  },
  {
    method: 'GET',
    path: '/transportes/{city}',
    handler:
      TransportsController.findSchedulesByCity.bind(TransportsController),
  },
]
