const CidadeController = require("../controllers/cidade-controller");

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
