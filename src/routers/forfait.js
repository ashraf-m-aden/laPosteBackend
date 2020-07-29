const express = require("express")
const router = new express.Router()
const Forfait = require("../models/forfait")
const HistoriqueF = require("../models/historiqueForfait")
const auth = require('../middleware/auth')

router.post('/forfait', async (req, res) => { //creer un forfait
    
    try {
        const forfait = new Forfait(req.body)

        await forfait.save()
        return res.status(201).send(forfait)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/forfait/:id', async (req, res) => {
    
    try {
        const forfait = Forfait.findById({_id:req.id})
        forfait.name = req.body.name
        forfait.price = req.body.price
        forfait.idClientType = req.body.idClientType
        forfait.enabled = req.body.enabled
        await forfait.save()
        return res.status(201).send(forfait)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/forfaits', async (req, res) => {
    
    try {
        const forfaits = await Forfait.find({})
        return res.status(201).send(forfaits)
    } catch (error) {
        return res.status(404).send(error)
    }
})
 ////////////////////////////////////////////////////////////////////////////////
 router.post('/forfait',auth, async (req, res) => { //ajouter un forfait à un client
    
    try {
        const forfait = new Forfait(req.body)

        await forfait.save()
        return res.status(201).send(forfait)
    } catch (error) {
        return res.status(404).send(error)
    }
})

module.exports = router