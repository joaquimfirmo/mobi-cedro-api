const CityController = require('../controllers/city-controller')

const cityController = new CityController()

module.exports = {
  method: 'GET',
  path: '/cidades',
  handler: cityController.all,
  options: {
    description: 'Lista todas as cidades',
    tags: ['api'],
  },
}
