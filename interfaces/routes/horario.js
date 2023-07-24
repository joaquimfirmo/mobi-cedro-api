const ScheduleController = require("../controllers/horario-controller");

const scheduleController = new ScheduleController();

module.exports = {
  method: "GET",
  path: "/horarios",
  handler: scheduleController.all,
  options: {
    description: "Lista todos os horários",
    tags: ["api"],
  },
};
