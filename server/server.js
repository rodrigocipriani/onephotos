const http = require("http");
const https = require("https");
const cluster = require("cluster");
const config = require("./config");
const app = require("./app")();
const workers = require("os").cpus().length;
const fs = require("fs");

if (cluster.isMaster && config.env !== "development") {
  for (let i = 0; i < workers; i += 1) {
    cluster.fork();
  }
} else {
  if (false) {
    // if (config.env === "development") {
    https
      .createServer(
        {
          // key: fs.readFileSync("key.pem"),
          // cert: fs.readFileSync("cert.pem")
        },
        app
      )
      .listen(config.port, () => {
        console.log(`Servidor https escutando na porta ${config.port}`); // eslint-disable no-console
        console.log(`Ambiente de [${config.env}]`); // eslint-disable no-console
      });
  } else {
    http.createServer(app).listen(config.port, () => {
      console.log(`Servidor http escutando na porta ${config.port}`); // eslint-disable no-console
      console.log(`Ambiente de [${config.env}]`); // eslint-disable no-console
    });
  }
}
