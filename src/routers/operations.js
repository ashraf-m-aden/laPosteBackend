const express = require("express")
const router = new express.Router()
const OPERATION = require("../models/operations")
const CT = require("../models/clientType")
const HO = require('../models/historicOperations')
const auth = require('../middleware/auth')

router.post('/operation', async (req, res) => { //enregistrer une operation

    try {
        const operation = new OPERATION(req.body)

        await operation.save()
        return res.status(201).send(operation)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/historicOperation', async (req, res) => { //enregistrer une operation

    try {
        const operation = new HO(req.body)

        await operation.save()
        return res.status(201).send(operation)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/deleteOp/:id', async (req, res) => { //enregistrer une operation

    try {
        const operation = await HO.findById({_id:req.params.id})
        operation.enabled = false;
        await operation.save()
        return res.status(201).send(operation)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/operations/:id', async (req, res) => { //recuperer les operation d'un client

    try {
        const operations = await HO.find({ idClient: req.params.id, enabled: true })
        if (!operations) {
            res.status(200).send({ operations: [] })
        }
        res.status(200).send(operations)

    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/operation/:id', async (req, res) => { // recuperer une operation

    try {
        const operation = await HO.findById({ _id: req.params.id, enabled: true })
        if (!operation) {
            res.status(200).send({ operations: [] })
        }
        res.status(200).send(operation)

    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/allOperations', async (req, res) => { // recuperer un forfait

    try {
        const operations = await HO.find({enabled: true})
        if (!operations) {
            res.status(200).send({ operations: [] })
        }
        res.status(200).send(operations)

    } catch (error) {
        return res.status(404).send(error)
    }
})
module.exports = router