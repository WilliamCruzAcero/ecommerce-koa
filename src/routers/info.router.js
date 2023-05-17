const Router = require('koa-router');
const { viewInfo } = require('../controller/info.controller');


const infoRouter = new Router({
    prefix: '/info'
});

infoRouter.get('/', viewInfo )

module.exports = {
    infoRouter
}; 