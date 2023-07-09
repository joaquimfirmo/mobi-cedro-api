class ListAllCities {
  constructor(citiesRepository) {
    this.citiesRepository = citiesRepository;
  }

  async execute() {
    const cities = await this.citiesRepository.all();
    return cities;
  }
}

module.exports = ListAllCities;
