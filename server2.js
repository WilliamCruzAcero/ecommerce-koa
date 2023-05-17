const Koa = require('koa');
const render = require('koa-ejs');
const path = require('path');
 
const app = new Koa();
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  
});
 
app.use(async function (ctx) {
  await ctx.render('home');
});
 
app.listen(7001,()=>{console.log('escucando 7001')});