const Router = require('koa-router');
const { home } = require('../controller/viewHome.controller');

const homeRouter = new Router({
    prefix: '/'
});

homeRouter.get('/', home)

module.exports = {
    homeRouter
}; 