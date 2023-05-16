require('dotenv').config({ path: './env'})
const Server = require('./server');


const main = async () => {
    
    const port = process.argv[3] || process.env.PORT;
    const server = new Server(port);

    await server.start();
    // await server.listen();
};

// const modoCluster = process.argv[2] === 'CLUSTER'
// const cpuNum = cpus().length;

// if (modoCluster && cluster.isPrimary) {
//     console.log(`Cluster iniciando. CPUS: ${cpuNum}`);
//     console.log(`PID: ${process.pid}`);
//     for (let i = 0; i < cpuNum - 1; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', worker => {
//         console.log(`${new Date().toLocaleString()}: Worker ${worker.process.pid}`);
//         cluster.fork();
//     })
// } else {
//     console.log(`PID: ${process.pid}`);
//     main();
// }
main();