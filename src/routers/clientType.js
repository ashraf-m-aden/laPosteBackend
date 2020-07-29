const express = require("express")
const router = new express.Router()
const ClientType = require("../models/clientType")
const ClientStatus = require("../models/clientStatus")

router.post('/ClientT', async (req, res) => {
    
    try {
        const clientT = new ClientType(req.body)

        await clientT.save()
        return res.status(201).send(clientT)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/clientStatus', async (req, res) => {

    try {
        const status = new ClientStatus(req.body)

        await status.save()
        return res.status(201).send(status)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/ClientT/:id', async (req, res) => {
    
    try {
        const clientT = ClientType.findById({_id:req.id})
        clientT.name = req.body.name
        clientT.description = req.body.description
        clientT.idTypeBoite = req.body.idTypeBoite
        await clientT.save()
        return res.status(201).send(clientT)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/ClientT', async (req, res) => {
    
    try {
        const clientTs = await ClientType.find({})
        return res.status(201).send(clientTs)
    } catch (error) {
        return res.status(404).send(error)
    }
})

module.exports = router