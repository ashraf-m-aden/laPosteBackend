const express = require("express")
const router = new express.Router()
const BoiteType = require("../models/boiteType")
const auth = require('../middleware/auth')
router.post('/boiteT',auth, async (req, res) => {
    
    try {
        const boiteT = new BoiteType(req.body)
        await boiteT.save()
        return res.status(201).send(boiteT)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/boiteT/:id',auth, async (req, res) => {
    
    try {
        const boiteT = boiteType.findById({_id:req.id})
        boiteT.type = req.body.type
        boiteT.description = req.body.description
        boiteT.price = req.body.price
        boiteT.enabled = req.body.enabled
        await boiteT.save()
        return res.status(201).send(boiteT)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/boiteT',auth, async (req, res) => {
    
    try {
        const boiteTs = await BoiteType.find({})
        return res.status(201).send(boiteTs)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/oneBoiteT/:id',auth, async (req, res) => {
    
    try {
        const boiteT = await BoiteType.findById({_id:req.params.id})
        return res.status(201).send(boiteT)
    } catch (error) {
        return res.status(404).send(error)
    }
})

module.exports = router