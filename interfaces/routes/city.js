const CidadeController = require("../controllers/city-controller");

const cidadeController = new CidadeController();

module.exports = {
  method: "GET",
  path: "/cidades",
  handler: cidadeController.all,
  options: {
    description: "Lista todas as cidades",
    tags: ["api"],
  },
};
