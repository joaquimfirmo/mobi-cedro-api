


const attachConnection =  async (request, h) => {

 
      return "DB Conectado aqui";

   
};




module.exports = {
  name: "mysql",
  version: "1.0.0",
  register: async function (server, options) {

        server.app.mysql = attachConnection();
    // server.events.on('response', attachConnection);
    // server.ext('onPreAuth', attachConnection);
  },
};
