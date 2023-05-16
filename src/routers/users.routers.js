const Router = require('koa-router');
const { allUsers, addUSer } = require('../controller/user.controller');

const userRouter = new Router({
    prefix: '/user'
});

userRouter.get('/', allUsers);
userRouter.post('/', addUSer);


module.exports = {
    userRouter
}; 