const express = require("express")
const router = new express.Router()
const Client = require("../models/client")
const BGP = require("../models/clients")
const auth = require('../middleware/auth')

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
    try {
        clients.forEach(async element => {
            const boite = await BGP.findOne({Nomcl:element.name})
            if (element.name = boite.Nomcl) {
            }
            if (boite) {
                element.boiteNumber = boite.Nbp
                await element.save()           }

        });
        return res.status(201).send(client)
    } catch (error) {
        res.status(400).send(error)
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
    console.log(req);
    try {
        const client = await Client.findById({ _id: req.params.id })
        console.log(req.id);
        if (!client) {
            return res.status(404).send('Client inexistant')
        }
        res.status(200).send(client)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.get('/clients', async (req, res) => {  // get All client
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
    
module.exports = router