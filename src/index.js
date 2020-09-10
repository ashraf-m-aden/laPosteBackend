const express = require("express")
require('./db/mongoose')
const cors = require("cors")
const path = require("path")
const clientTRouter = require("./routers/clientType")
const forfait = require("./routers/forfait")
const boiteType = require("./routers/boiteType")
const boite = require("./routers/boite")
const client = require("./routers/client")
const staff = require("./routers/staff")
const staffT = require("./routers/staffType")
const historicPys = require("./routers/historiquePaiements")
const operations = require("./routers/operations")
const clientBoites = require("./routers/clientBoites")
const historicDeletion = require("./routers/historicDeletion")
const cluster = require ('cluster')

let workers = [];

const app = express()
const port = process.env.PORT || 3000
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-requested-width, Authorization,  Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, DELETE, POST");
  next();
});
const imagesPath = path.join(__dirname, '../images')


app.use('/images', express.static(imagesPath))
app.use(express.json())
app.use(clientTRouter)
app.use(forfait)
app.use(boiteType)
app.use(boite)
app.use(client)
app.use(staff)
app.use(staffT)
app.use(historicPys)
app.use(operations)
app.use(clientBoites)
app.use(historicDeletion)


const setupWorkerProcesses = () => {
  // to read number of cores on system
  let numCores = require('os').cpus().length;
  console.log('Master cluster setting up ' + numCores + ' workers');

  // iterate on number of cores need to be utilized by an application
  // current example will utilize all of them
  for(let i = 0; i < numCores; i++) {
      // creating workers and pushing reference in an array
      // these references can be used to receive messages from workers
      workers.push(cluster.fork());

      // to receive messages from worker process
      workers[i].on('message', function(message) {
          console.log(message);
      });
  }

  // process is clustered on a core and process id is assigned
  cluster.on('online', function(worker) {
      console.log('Worker ' + worker.process.pid + ' is listening');
  });

  // if any of the worker process dies then start a new one by simply forking another one
  cluster.on('exit', function(worker, code, signal) {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      cluster.fork();
      workers.push(cluster.fork());
      // to receive messages from worker process
      workers[workers.length-1].on('message', function(message) {
          console.log(message);
      });
  });
};
const startServer = ()=> {
  app.listen(port, () => {
    console.log('Server is up on port ' + port);
  })
}

   // if it is a master process then call setting up worker process
   if(cluster.isMaster) {
    setupWorkerProcesses();
} else {
    // to setup server configurations and share port address for incoming requests
    startServer();
}
