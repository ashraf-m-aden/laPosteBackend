const express = require("express")
const router = new express.Router()
const auth = require('../middleware/auth')
const Boite = require("../models/boite")
const Client = require("../models/client")
const BC = require("../models/clientBoite")
const MB = require("../models/clients")


router.post('/boite', auth, auth, async (req, res) => {
    const boite = new boite(req.body)
    try {
        boite.save()
        return res.status(201).send(boite)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/boites', async (req, res) => { //code pour faire migrer la base de données en un coup
    const boites = await Boite.find({})
    try {
        await boites.forEach(element => {
            element.enabled = true
            element.save()
        });
        return res.status(201).send(boites)

    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/boite/:id', auth, auth, async (req, res) => {
    const boite = await Boite.findById({ _id: req.id })
    if (!boite) {
        return res.statut(404).send("La boite n'existe pas")
    }
    try {
        boite.number = req.body.number
        boite.idBoiteType = req.body.idBoiteType
        boite.enabled = req.body.enabled
        await boite.save()
        return res.send(boite)
    } catch (error) {
        res.status(500).send("Une erreur est survenue, veuillez recommencer.")
    }
})

router.delete('/boite', async (req, res) => {
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/boite/:id', async (req, res) => {  // get one boite
    try {
        const boite = await Boite.findById({ _id: req.params.id })
        if (!boite) {
            return res.status(404).send('boite inexistant')
        }
        res.status(200).send(boite)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.get('/boites', auth, async (req, res) => {  // get All boite
    try {
        const boites = await Boite.find({})
        if (!boites) {
            return res.status(404).send('Pas de boites')
        }
        res.status(200).send(boites)
    } catch (error) {
        res.status(500).send('Problem de serveur')
    }
})
router.get('/Aboites', async (req, res) => {  // get All boite
    try {
        const boites = await Boite.find({ enabled: false })
        if (!boites) {
            return res.status(404).send('Pas de boites')
        }
        res.status(200).send(boites)
    } catch (error) {
        res.status(500).send('Problem de serveur')
    }
})

router.get('/boiteClient/:id', auth, async (req, res) => {  // get the clients of one box
    try {
        const boite = await BC.find({ idBoite: req.params.id })
        if (!boite) {
            return res.status(404).send('boite inexistante')
        }
        res.status(200).send(boite)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.post('/attributeBoite/:id', auth, async (req, res) => {
    try {
        const boite = await Boite.findOne({ _id: req.params.id })
        const cb = await BC.findOne({ enabled: true, idBoite: req.params.id })
        if (!boite || !cb) {
            return res.status(404).send('boite inexistante')
        }
        cb.enabled = false
        cb.status = 'Resilié'
        cb.bg = "background:red"
        cb.idStatus = "5f211c19c9518f4404e03c2e"
        cb.idStaff = req.staff._id
        cb.releaseDate = new Date()
        boite.enabled = false
        await boite.save()
        await cb.save()
        res.status(200).send({ boite, cb })
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router