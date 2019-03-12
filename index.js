const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const router = require("./src/routes/index");
const app = new Koa();

const server = require("http").createServer(app.callback());

server.listen(3000);

app.use(cors());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

console.log("服务器已启动,端口3000");
