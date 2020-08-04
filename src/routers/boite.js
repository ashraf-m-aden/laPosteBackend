const express = require("express")
const router = new express.Router()
const auth = require('../middleware/auth')
const Boite = require("../models/boite")
const IMP = require("../models/impayes")
const Client = require("../models/client")
const BC = require("../models/clientBoite")
const CL = require("../models/client")
const Retard = require("../models/retard")

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
    const clients = await Client.find({})
    try {
        clients.forEach(async client => {
            if (client.status === 'A jour' || (client.status === 'En retard')) {
                const boite = await Boite.findOne({ _id: client.idBoite })
                if (boite) {
                    boite.enabled = false;
                    await boite.save()
                }
            }
        })
        return res.status(201).send()

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

router.delete('/boite/:id', auth, async (req, res) => {
    const boite = Boite.findById({ _id: req.id })
    if (!boite) {
        return res.statut(404).send("Le boite n'existe pas")
    }
    try {
        boite.enabled = !boite.enabled  // j'active ou desactive le boite
        boite.save()
        res.status(201).send(boite)

    } catch (error) {
        res.status(500).send("Une erreur est survenue lors de la modification veuillez réessayer.")
    }

})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/boite/:id', auth, async (req, res) => {  // get one boite
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
router.get('/Aboites', auth, async (req, res) => {  // get All boite
    try {
        const boites = await Boite.find({ enabled: true })
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
        const boite = await BC.findOne({ idBoite: req.params.id })
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
        if (!boite) {   
            return res.status(404).send('boite inexistante')
        }
        boite.enabled = false
        await boite.save()
        res.status(200).send(boite)
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router