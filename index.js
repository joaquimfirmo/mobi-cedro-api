const Hapi = require("@hapi/hapi");

const initServer = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route([
    {
      method: "GET",
      path: "/",
      handler: (request, h) => {
        return "API Mobilidade Cedro";
      },
    },
    {
      method: "POST",
      path: "/",
      handler: (request, h) => {
        return "POST - API Mobilidade Cedro";
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
