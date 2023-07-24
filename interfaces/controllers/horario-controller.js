const AllSchedules = require("../../application/use_cases/horarios/list-all- schedules");
// por enquanto os reposiories serão importados e passados para o use-case no controller
const ScheduleRepository = require("../../infrastructure/repositories/horario-repository");

class CidadeController {
  async all() {
    const schedulesRepository = new ScheduleRepository();
    const allSchedules = new AllSchedules(schedulesRepository);
    const schedules = await allSchedules.execute();

    return schedules;
  }
}

module.exports = CidadeController;
