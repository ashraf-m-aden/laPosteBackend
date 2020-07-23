const express = require("express")
const router = new express.Router()
const auth = require('../middleware/auth')
const Boite = require("../models/boite")
const BGP = require("../models/clients")


router.post('/boite', auth, async (req, res) => {
    const boite = new boite(req.body)
    try {
        boite.save()
        return res.status(201).send(boite)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/boites', async (req, res) => { //code pour faire migrer la base de données en un coup
    const boites = await BGP.find({})
    var allBoites = []
    try {
        boites.forEach(async element => {
            var boite = new Boite()
            boite.number = element.Nbp
            switch (element.Code_Cat.toLowerCase()) {
                case "mo":
                    boite.idBoiteType = "5f17e01b37824a17b83d07a7"
                    break;
                    case "pe":
                    boite.idBoiteType = "5f17e01437824a17b83d07a6"
                    break;
                    case "bl":
                    boite.idBoiteType = "5f17f0323cc901299856629e"
                    break;
                    case "gr":
                    boite.idBoiteType = "5f17e00d37824a17b83d07a5"
                    break;

            }
            await boite.save()
        });
        return res.status(201).send(allBoites)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/boite/:id', auth, async (req, res) => {
    const boite = Boite.findById({_id:req.id})
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

router.delete('/boite/:id',auth,async(req,res)=>{
    const boite = Boite.findById({_id:req.id})
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
        const boite = await Boite.findById({ _id: req.id })
        if (!boite) {
            return res.status(404).send('boite inexistant')
        }
        res.status(200).send(boite)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.get('/boites', async (req, res) => {  // get All boite
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
    
module.exports = router