const AllCities = require("../../application/use_cases/cities/list-all-cities");
// por enquanto os reposiories serão importados e passados para o use-case no controller
const CitiesRepository = require("../../infrastructure/repositories/city-repository");

class CidadeController {
  async all() {
    const citiesRepository = new CitiesRepository();
    const allCities = new AllCities(citiesRepository);
    const cities = await allCities.execute();

    return cities;
  }
}

module.exports = CidadeController;
