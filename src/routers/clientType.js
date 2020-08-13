const express = require("express")
const router = new express.Router()
const ClientType = require("../models/clientType")
const ClientStatus = require("../models/clientStatus")
const Client = require("../models/client")
const Forfait = require("../models/forfait")
const auth = require("../middleware/auth")
router.post('/ClientT', auth, async (req, res) => {

    try {
        const clientT = new ClientType(req.body)

        await clientT.save()
        return res.status(201).send(clientT)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/ClientTs', async (req, res) => {
    const clientTs = await ClientType.find({})
    try {
        await clientTs.forEach(async clients => {
            console.log(clientTs);
            if (clients._id == "5f167fae24124d1b60b897a9") {
                clients.idBoitetypes = [
                    {
                        idBoiteType: "5f17e01437824a17b83d07a6",
                        price: 10000,
                        name: "Petite"

                    },
                    {
                        idBoiteType: "5f17e01b37824a17b83d07a7",
                        price: 15000,
                        name: "Moyenne"


                    },
                    {
                        idBoiteType: "5f17f0323cc901299856629e",
                        price: 20000,
                        name: "BL"


                    }
                ]
                await clients.save()
                console.log(clients);
            } else {
                clients.idBoitetypes = [
                    {
                        idBoiteType: "5f317a650f5f5b445cf1379c",
                        price: 20000,
                        name: "Moyenne"


                    },
                    {
                        idBoiteType: "5f17e00d37824a17b83d07a5",
                        price: 30000,
                        name: "Grande"
                    },
                    {
                        idBoiteType: "5f17f0323cc901299856629e",
                        price: 20000,
                        name: "BL"

                    }
                ]
                await clients.save()
            }
        });
        return res.status(201).send(clientTs)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/clientStatus', auth, async (req, res) => {

    try {
        const status = new ClientStatus(req.body)

        await status.save()
        return res.status(201).send(status)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/ClientT/:id', auth, async (req, res) => {

    try {
        const clientT = ClientType.findById({ _id: req.id })
        clientT.name = req.body.name
        clientT.description = req.body.description
        clientT.idTypeBoite = req.body.idTypeBoite
        await clientT.save()
        return res.status(201).send(clientT)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/ClientT', auth, async (req, res) => {

    try {
        const clientTs = await ClientType.find({})
        return res.status(201).send(clientTs)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/ClientT/:id', auth, async (req, res) => {

    try {
        const clientT = await ClientType.findById({ _id: req.params.id })

        return res.status(201).send(clientT)
    } catch (error) {
        return res.status(404).send(error)
    }
})


module.exports = router