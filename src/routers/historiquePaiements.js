const express = require("express")
const router = new express.Router()
const HistoricP = require('../models/historiquePaiements')
const Clients = require('../models/client')
const Boites = require('../models/boite')
const Clientb = require('../models/clientBoite')
const HF = require('../models/historiqueForfait')
const auth = require('../middleware/auth')
const Forfaits = require('../models/forfait')

router.post('/historicP', auth, async (req, res) => {
    try {
        const hp = await new HistoricP(req.body)
        await hp.save()
        return res.status(201).send(hp)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.get('/historicPs/:id', async (req, res) => {
    try {
        const historics = await HistoricP.find({ idClient: req.params.id })
        if (!historics) {
            return res.status(404).send("Pas de paiements pour ce client")

        }
        return res.status(201).send(historics)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.get('/payment/:id', async (req, res) => {
    try {
        const historic = await HistoricP.findById({ _id: req.params.id })
        if (!historic) {
            return res.status(404).send("Pas de paiement")
        }
        return res.status(201).send(historic)
    } catch (error) {
        return res.status(500).send(error)
    }
})


router.post('/historicPs', auth, async (req, res) => {
    const clientB = await Clientb.find({})
    const allForfaits = await Forfaits.find({})
    const historicF = await HF.find({})
    const boite = await Boites.find({})


    try {

        clientB.forEach(async client => {
            const hp = await new HistoricP()
            const total = 0
            hp.boiteNumber = client.boiteNumber
            hp.idBoite = client.idBoite
            hp.idClient = client.idClient
            hp.date = client.startDate
            hp.staffs.push({ idStaff: req.staff._id })
            const hf = historicF.filter((h)=>{return h.idBoite.toString() === client.idBoite.toString()})
            if (hf.forfaits) {
                await hf.forfaits.forEach(async forfait => {
                    await allForfaits.forEach(element => {
                        if (forfait.idForfait == element._id) {
                            hp.forfaits.push({
                                idForfait: forfait.idForfait,
                                price: element.price
                            })
                        }
                    });
                });
                await hp.forfaits.forEach(forfait => {
                    total = total + parseInt(forfait.price)
                });
            }
            const bo = boite.filter((b) => { return b._id.toString() === client.idBoite.toString() })
                hp.priceBoite = bo.price
            hp.total = parseInt(total) + parseInt(bo[0].price)
            await hp.save()
        });
        const hps = await HistoricP.find({})
        return res.status(201).send(hps)
    } catch (error) {
        return res.status(500).send(error)
    }
})








module.exports = router