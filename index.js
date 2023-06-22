const Hapi = require("@hapi/hapi");
const mysql = require('./plugin-teste');
const cidade = require("./cidade");
const Cidade = require("./cidade");
const transaction = require("./transaction")

const initServer = async () => {
  
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
 
  // await server.register({
  //   plugin:  require('./plugin-teste'),
  // })
  server.app.reposity =  require('./repository');
  server.route([
    {
      method: "GET",
      path: "/",
      handler: async (request, h) => {
        let conn;
        try {
          await transaction.open();
          conn = transaction.get();
          const [rows, fields] = await conn.execute('select * from cidades limit 10');
  
        
          return rows;    
          
        } catch (error) {
          console.log(error);
          
        }finally{
          if (conn)  await transaction.close();
        }
       
        
      },
    },
    {
      method: "POST",
      path: "/",
      handler: (request, h) => {
        console.log(request.payload)
        const cidade = new Cidade(request.payload)
        return cidade;
      },
    },
  ]);

 

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

initServer();
