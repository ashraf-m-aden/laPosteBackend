const express = require("express")
const router = new express.Router()
const Client = require("../models/client")
const CB = require("../models/clientBoite")
const PAYES = require("../models/payes")
const Boites = require("../models/boite")
const CS = require("../models/clientStatus")
const auth = require('../middleware/auth')
const HF = require("../models/historiqueForfait")

router.post('/client', auth, async (req, res) => {
    const client = new Client(req.body)
    try {
        client.save()
        return res.status(201).send(client)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/clients', async (req, res) => {
    const clients = await Client.find({})
    const payes = await PAYES.find({})
    const boites = await Boites.find({})
    const cs = await CS.find({})
     try {
        await clients.forEach(async client => {
  
            if (client.status ==='A jour') {
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

router.patch('/client/:id', auth, async (req, res) => {
    const client = Client.findById({_id:req.id})
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

router.delete('/client/:id',auth,async(req,res)=>{
    const client = Client.findById({_id:req.id})
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

router.get('/client/:id', async (req, res) => {  // get one client
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
router.get('/clients',  async (req, res) => {  // get All client
    try {
        const clients = await Client.find({})
        if (!clients) {
            return res.status(404).send('Pas de clients')
        }
        res.status(200).send(clients)
    } catch (error) {
        res.status(500).send('Problem de serveur')
    }
})

router.get('/clientBoite/:id', async (req, res) => {  // get the boxes of one client
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
        const client = await Client.find({})
        if (!client) {
            return res.status(404).send('Client inexistant')
        }
        for (let index = 0; index < client.length; index++) {
            for (let i = 0; i < client.length; i++) {
                if (client[index].name.toString() == client[i].name.toString() && client[index]._id.toString()!==client[i]._id.toString() ) {
                    await client[i].remove()
                    console.log(index + ' enlevé ' + i);
                }
            }
            
        }
        res.status(200).send(client)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
    
module.exports = router