
const {fork} = require('child_process');

const viewInfo = (ctx) => {

  const serverInfo = 
    {
      path: process.cwd(),
      plataforma: process.platform,
      pid: process.pid,
      version: process.version,
      carpeta: process.title,
      memoria: process.memoryUsage.rss()
    }

  const dataNucleos = fork('./child/cpus.js')
  dataNucleos.send('start');
  dataNucleos.on('message', numNucleos => {
    
    ctx.status = 200
    ctx.render('mostrar-info', {
      info: serverInfo,
      numNucleos
    });
  })
}

module.exports = {
  viewInfo
}