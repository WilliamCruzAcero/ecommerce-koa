
const home = async function (ctx) {
    // ctx.status = 200
    await ctx.render('home');
  }

  module.exports = {
    home
  } 