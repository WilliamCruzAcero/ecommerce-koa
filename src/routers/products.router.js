const Router = require('koa-router');
const { addProduct } = require('../controller/products.controller');


const productRouter = new Router({
    prefix: '/product'
});

// productRouter.get('/', allProducts);
productRouter.post('/', addProduct);

module.exports = {
    productRouter
}; 