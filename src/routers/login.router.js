const Router = require('koa-router');
const { login, viewLogin } = require('../controller/login.controller');


const loginRouter = new Router({
    prefix: '/login'
});

loginRouter.get('/', viewLogin)
loginRouter.post('/', login)



 
module.exports = {
    loginRouter
}; 