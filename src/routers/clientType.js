const express = require("express")
const router = new express.Router()
const ClientType = require("../models/clientType")
const ClientStatus = require("../models/clientStatus")
const Forfait = require("../models/forfait")

router.post('/ClientT', async (req, res) => {
    
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
        clientTs.forEach(async client => {
            if (client._id == "5f167fae24124d1b60b897a9") {
                console.log('yes');
                await client.forfaits.push(
                    { idForfait: "5f17def8d3194c205c55612d", price: 5000 },
                    { idForfait: "5f17df05d3194c205c55612e", price: 5000 },
                    { idForfait: "5f17df19d3194c205c55612f", price: 5000 },
                    { idForfait: "5f17df20d3194c205c556130", price: 5000 },
                    { idForfait: "5f17df35d3194c205c556131", price: 5000 },
                )
                await client.save()
            } else {
                await client.idBoitetypes.push(
                    { idForfait: "5f17def8d3194c205c55612d", price: 5000 },
                    { idForfait: "5f17df05d3194c205c55612e", price: 5000 },
                    { idForfait: "5f17df19d3194c205c55612f", price: 5000 },
                    { idForfait: "5f17df20d3194c205c556130", price: 5000 },
                    { idForfait: "5f17df35d3194c205c556131", price: 5000 },

                )
                await client.save()
            }
        } )
        return res.status(201).send(clientTs)
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
router.get('/ClientT/:id', async (req, res) => {

    try {
        const clientT = await ClientType.findById({ _id: req.params.id })
        
        return res.status(201).send(clientT)
    } catch (error) {
        return res.status(404).send(error)
    }
})


module.exports = router