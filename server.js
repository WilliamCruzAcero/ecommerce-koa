require('dotenv').config();
const Koa = require('koa');
const render = require('koa-ejs');
const path = require('path');
const json = require('koa-json');
const { koaBody } =require('koa-body');
const serve = require('koa-static');

const { conectDB } = require('./src/conetcDB/conectDB');
const {userRouter} = require('./src/routers/user.routers');
const { productRouter } = require('./src/routers/products.router');
const { loginRouter } = require('./src/routers/login.router');
const { homeRouter } = require('./src/routers/home.router');
const { infoRouter } = require('./src/routers/info.router');


class Server {

    constructor(port) {
        this.app = new Koa();
        this.port = port
    }
    
    async start() {
        
        await conectDB();
        
        render(this.app, {
            root: path.join(__dirname, 'views'),
            layout:false,
            viewExt: 'ejs',
        })

        // app.use(require('koa-static')(root, opts));
        this.app.use(serve(__dirname + '/public/javascript'))
        // this.app.use(serve(__dirname * '/public/avatares'))

        this.app.use(json());
        this.app.use(koaBody());

        this.app.use(homeRouter.routes());
        this.app.use(infoRouter.routes());
        this.app.use(userRouter.routes());
        this.app.use(productRouter.routes());
        this.app.use(loginRouter.routes());


        this.app.listen(this.port, () => {
            console.log(`Servidor ejecutandose en el puerto: ${this.port}`);
        })
    }
}

module.exports = Server;