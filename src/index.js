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


const app = express()
const port = process.env.PORT || 3000
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-requested-width, Authorization,  Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, DELETE, POST");
  next();
});
const imagesPath = path.join(__dirname, '../images')


app.use('/images',express.static(imagesPath))
app.use(express.json())
app.use(clientTRouter)
app.use(forfait)
app.use(boiteType)
app.use(boite)
app.use(client)
app.use(staff)
app.use(staffT)
app.use(historicPys)


app.listen(port, () => {
  console.log('Server is up on port ' + port);

})
