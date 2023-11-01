const jsonServer = require("json-server");
const path = require("path");
const mid = require("./middlewares/test");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({ bodyParser: true, logger: true });

server.use(middlewares);
server.use(mid);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
