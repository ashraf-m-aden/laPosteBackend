const express = require("express")
const router = new express.Router()
const OPERATION = require("../models/operations")
const CT = require("../models/clientType")
const HO = require('../models/historicOperations')
const auth = require('../middleware/auth')

router.post('/operation', async (req, res) => { //creer un forfait

    try {
        const operation = new OPERATION(req.body)

        await operation.save()
        return res.status(201).send(operation)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/operations/:id', async (req, res) => { //creer un forfait

    try {
        const operations = await HO.find({ idClient: req.params.id })
        if (!operations) {
            res.status(200).send({ operations: [] })
        }
        res.status(200).send(operations)

    } catch (error) {
        return res.status(404).send(error)
    }
})
module.exports = router