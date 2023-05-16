require('dotenv').config();
const Koa = require('koa');

const { koaBody } =require('koa-body');

const { conectDB } = require('./src/conetcDB/conectDB');
const {userRouter} = require('./src/routers/users.routers');
const { productRouter } = require('./src/routers/products.router');
const { loginRouter } = require('./src/routers/login.router');


class Server {

    constructor(port) {
        this.app = new Koa();
        this.port = port
    }
    
    async start() {
        await conectDB();
     
        this.app.use(koaBody());

        this.app.use(userRouter.routes());
        this.app.use(productRouter.routes());
        this.app.use(loginRouter.routes());


        this.app.listen(this.port, () => {
            console.log(`Servidor ejecutandose en el puerto: ${this.port}`);
        })
    }
}

module.exports = Server;