const express = require("express")
require('./db/mongoose')
const cors = require("cors")
const path = require("path")
const country = require("./routers/country")
const transaction = require("./routers/transaction")
const staff = require("./routers/staff")
const role = require("./routers/role")
const company = require("./routers/company")
const cluster = require('cluster')

let workers = [];

const app = express()
const port = process.env.PORT || 3000
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", ["https://bolt-money-transfert.web.app", "http://localhost:4200"]);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-requested-width, Authorization,  Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, DELETE, POST");
  next();
});
const imagesPath = path.join(__dirname, '../images')

var corsOptions = {
  origin: ['http://localhost:4200',process.env.frontend]
}
app.use(cors(corsOptions))
app.use('/images', express.static(imagesPath))
app.use(express.json())
app.use(country)
app.use(transaction)
app.use(staff)
app.use(role)
app.use(company)


const setupWorkerProcesses = () => {
  // to read number of cores on system
  let numCores = require('os').cpus().length;
  console.log('Master cluster setting up ' + numCores + ' workers');

  // iterate on number of cores need to be utilized by an application
  // current example will utilize all of them
  for (let i = 0; i < numCores; i++) {
    // creating workers and pushing reference in an array
    // these references can be used to receive messages from workers
    workers.push(cluster.fork());

    // to receive messages from worker process
    workers[i].on('message', function (message) {
      console.log(message);
    });
  }

  // process is clustered on a core and process id is assigned
  cluster.on('online', function (worker) {
    //  console.log('Worker ' + worker.process.pid + ' is listening');
  });

  // if any of the worker process dies then start a new one by simply forking another one
  cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
    workers.push(cluster.fork());
    // to receive messages from worker process
    workers[workers.length - 1].on('message', function (message) {
      console.log(message);
    });
  });
};
const startServer = () => {
  app.listen(port, () => {
    //  console.log('Server is up on port ' + port);
  })
}

// if it is a master process then call setting up worker process
if (cluster.isMaster) {
  setupWorkerProcesses();
} else {
  // to setup server configurations and share port address for incoming requests
  startServer();
}
