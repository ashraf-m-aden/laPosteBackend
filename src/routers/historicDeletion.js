const express = require("express")
const router = new express.Router()
const Deletion = require("../models/historicDeletion")
const auth = require('../middleware/auth')

router.post('/deletion', async (req, res) => { //enregistrer une deletion

    try {
        const deletion = await new Deletion(req.body)

        await deletion.save()
        return res.status(201).send(deletion)
    } catch (error) {
        return res.status(404).send(error)
    }
})


router.get('/deletions/:id', async (req, res) => { //recuperer les deletion d'un client

    try {
        const deletions = await Deletion.find({ idClient: req.params.id })
        if (!deletions) {
            res.status(200).send({ deletions: [] })
        }
        res.status(200).send(deletions)

    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/deletion/:id', async (req, res) => { // recuperer un forfait

    try {
        const deletion = await Deletion.findById({ _id: req.params.id })
        if (!deletion) {
            res.status(200).send({ deletions: [] })
        }
        res.status(200).send(deletion)

    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/alldeletions', async (req, res) => { // recuperer un forfait

    try {
        const deletions = await Deletion.find({})
        if (!deletions) {
            res.status(200).send({ deletions: [] })
        }
        res.status(200).send(deletions)

    } catch (error) {
        return res.status(404).send(error)
    }
})
module.exports = router