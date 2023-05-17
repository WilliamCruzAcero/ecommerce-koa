const Router = require('koa-router');
const { allUsers, registUser, viewRegistUser } = require('../controller/user.controller');

const userRouter = new Router({
    prefix: '/user'
});

userRouter.get('/', viewRegistUser);
userRouter.get('/', allUsers);
userRouter.post('/', registUser);


module.exports = {
    userRouter
}; 