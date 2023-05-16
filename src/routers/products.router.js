const Router = require('koa-router');
const { addProduct } = require('../controller/products.controller');


const productRouter = new Router({
    prefix: '/product'
});

productRouter.post('/', addProduct);

module.exports = {
    productRouter
}; 