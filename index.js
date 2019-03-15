const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const router = require("./src/routes/index");
const socketModel = require("./src/models/soketHander");
const app = new Koa();

const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);

server.listen(3000);

app.use(cors());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

io.on("connection", socket => {
    const socketId = socket.id;
    /*登录*/
    socket.on("login", async userId => {
        await socketModel.saveUserSocketId(userId, socketId);
    });
    /*更新soketId*/
    socket.on("update", async userId => {
        await socketModel.saveUserSocketId(userId, socketId);
    });
    socket.on("disconnect", data => {
        console.log("disconnect", data);
    });
});

console.log("服务器已启动,端口3000");
