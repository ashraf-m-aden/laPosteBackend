const express = require("express")
const router = new express.Router()
const Client = require("../models/client")
const CB = require("../models/clientBoite")
const PAYES = require("../models/payes")
const Boites = require("../models/boite")
const CS = require("../models/clientStatus")
const auth = require('../middleware/auth')
const HF = require("../models/historiqueForfait")
const HP = require("../models/historiquePaiements")

router.post('/client', auth, auth, async (req, res) => {
    const client = new Client(req.body)
    try {
        client.save()
        return res.status(201).send(client)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/clients', auth, async (req, res) => {
    const clients = await Client.find({})
    const payes = await PAYES.find({})
    const boites = await Boites.find({})
    const cs = await CS.find({})
    try {
        await clients.forEach(auth, async client => {

            if (client.status === 'A jour') {
                client.bg = 'background:green'
            } else if (client.status === 'En retard') {
                client.bg = 'background:yellow'
            } else {
                client.bg = 'background:red'

            }

            await client.save()

        });
        return res.status(201).send(clients)
    } catch (error) {
        res.status(400).send(error.response)
    }
})

router.patch('/client/:id', auth, auth, async (req, res) => {
    const client = Client.findById({ _id: req.id })
    if (!client) {
        return res.statut(404).send("Le client n'existe pas")
    }
    try {
        client.name = req.body.name
        client.email = req.body.email
        client.number = req.body.number
        client.address = req.body.address
        client.idClientType = req.body.idClientType
        client.idBoite = req.body.idBoite
        client.enabled = req.body.enabled
        await client.save()
        return res.send(client)
    } catch (error) {
        res.status(500).send("Une erreur est survenue, veuillez recommencer.")
    }
})

router.delete('/client/:id', auth, auth, async (req, res) => {
    const client = Client.findById({ _id: req.id })
    if (!client) {
        return res.statut(404).send("Le client n'existe pas")
    }
    try {
        client.enabled = !client.enabled  // j'active ou desactive le client
        client.save()
        res.status(201).send(client)

    } catch (error) {
        res.status(500).send("Une erreur est survenue lors de la modification veuillez réessayer.")
    }

})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/client/:id', auth, async (req, res) => {  // get one client
    try {
        const client = await Client.findById({ _id: req.params.id })
        if (!client) {
            return res.status(404).send('Client inexistant')
        }
        res.status(200).send(client)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.get('/clients', auth, async (req, res) => {  // get All client
    try {
        const clients = await Client.find({ enabled: true })
        if (!clients) {
            return res.status(404).send('Pas de clients')
        }
        res.status(200).send(clients)
    } catch (error) {
        res.status(500).send('Problem de serveur')
    }
})

router.get('/clientBoite/:id', auth, async (req, res) => {  // get the boxes of one client
    try {
        const client = await CB.find({ idClient: req.params.id })
        if (!client) {
            return res.status(404).send('Client inexistant')
        }
        res.status(200).send(client)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.get('/remove', async (req, res) => {  // get the boxes of one client
    try {
        const clients = await Client.find({ name: 'Ashraf Mohamed' })
        if (!clients) {
            return res.status(404).send('Client inexistant')
        }
        clients.forEach(async client => {
            const hfs = await HF.findOne({ idClient: client._id })
            const hps = await HP.findOne({ idClient: client._id })
            if (hfs) {
                await hfs.remove()

            }
            if (hps) {
                await hps.remove()

            }
            await client.remove()
        });
        res.status(200).send(clients)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})

module.exports = router