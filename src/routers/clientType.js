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
router.post('/clientTs', async (req, res) => {
    const clientTs = await ClientType.find({})
    try {
        await clientTs.forEach(async clients => {
            clients.operations = [
                {
                    idOperation: "5f3673eb336de80e1092d135",
                    price: 5000,
                    name: "Changement de nom"

                },
                {
                    idOperation: "5f367648336de80e1092d137",
                    price: 1500,
                    name: "Nouvelle clé A"

                },
                {
                    idOperation: "5f367655336de80e1092d138",
                    price: 3000,
                    name: "Nouvelle clé B1"

                },
                {
                    idOperation: "5f36765d336de80e1092d139",
                    price: 0,
                    name: "Nouvelle clé B2"

                },

            ]
            await clients.save()
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