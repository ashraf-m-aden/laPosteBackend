const express = require("express")
const router = new express.Router()
const Forfait = require("../models/forfait")
const Clientboite = require("../models/clientBoite")
const HistoriqueF = require("../models/historiqueForfait")
const auth = require('../middleware/auth')
const Paye = require('../models/payes')
const Imp = require('../models/impayes')
const Retard = require('../models/retard')
const ClientType = require('../models/clientType')
router.post('/forfait', async (req, res) => { //creer un forfait

    try {
        const forfait = new Forfait(req.body)

        await forfait.save()
        return res.status(201).send(forfait)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/historicForfait', auth, async (req, res) => { //creer un forfait

    try {
        const hf = new HistoriqueF(req.body)
        await hf.save()
        return res.status(201).send(hf)
    } catch (error) {
        return res.status(500).send(error)
    }
})
router.post('/forfaits', auth, async (req, res) => { //creer les forfait
    const payes = await Paye.find({})
    const impayes = await Imp.find({})
    const retards = await Retard.find({})
    const clientb = await Clientboite.find({})
    try {
        clientb.forEach(async element => {
            const forfait = await new HistoriqueF()
            await payes.forEach(paye => {
                if (element.clientName == paye.clientName) {
                    if (paye.DOMICILE !== "NULL") {
                        forfait.forfaits.push({
                            idForfait: "5f17def8d3194c205c55612d"
                        })
                    }
                    if (paye.SC !== "NULL") {
                        forfait.forfaits.push({
                            idForfait: "5f17df35d3194c205c556131"
                        })
                    }
                }
            });
            await impayes.forEach(async paye => {
                if (element.clientName == paye.clientName) {
                    if (paye.DOMICILE !== "NULL") {
                        forfait.forfaits.push({
                            idForfait: "5f17def8d3194c205c55612d"
                        })
                    }
                    if (paye.SC !== "NULL") {
                        forfait.forfaits.push({
                            idForfait: "5f17df35d3194c205c556131"
                        })
                    }
                }
            });
            await retards.forEach(async paye => {
                if (element.clientName == paye.clientName) {
                    if (paye.DOMICILE !== "NULL") {
                        forfait.forfaits.push({
                            idForfait: "5f17def8d3194c205c55612d"
                        })
                    }
                    if (paye.SC !== "NULL") {
                        forfait.forfaits.push({
                            idForfait: "5f17df35d3194c205c556131"
                        })
                    }
                }
            });
            forfait.idClient = element.idClient
            forfait.idBoite = element.idBoite
            forfait.idStaff = req.staff._id
            await forfait.save()

        });
        const hf = await HistoriqueF.find({})
        return res.status(201).send(hf)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/forfait/:id', auth, async (req, res) => {

    try {
        const forfait = Forfait.findById({ _id: req.id })
        forfait.name = req.body.name
        forfait.price = req.body.price
        forfait.idClientType = req.body.idClientType
        forfait.enabled = req.body.enabled
        await forfait.save()
        return res.status(201).send(forfait)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/forfaits', auth, async (req, res) => {

    try {
        const forfaits = await Forfait.find({})
        return res.status(201).send(forfaits)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/forfaitClientT', auth, async (req, res) => {  // les forfaits pour un type de cient

    try {
        const forfaits = await Forfait.find({})
        return res.status(201).send(forfaits)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/clientForfait/:id', auth, async (req, res) => {
    const forfaitsClient = []
    const forfaits = await Forfait.find({})
    const allHf = await HistoriqueF.find({})
    try {
        const hf = await HistoriqueF.findOne({ idClient: req.params.id })
        if (!hf) {
            return res.send('Pas de forfaits')
        }
        hf.forfaits.forEach(element => {
            forfaits.forEach(forf => {
                if (element.idForfait === forf._id) {
                    forfaits.push(forf)
                }
            });
        });
        return res.status(201).send(forfaitsClient)
    } catch (error) {
        return res.status(404).send(error)
    }
})
////////////////////////////////////////////////////////////////////////////////
router.post('/forfait', auth, async (req, res) => { //ajouter un forfait à un client

    try {
        const forfait = new Forfait(req.body)

        await forfait.save()
        return res.status(201).send(forfait)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.post('/cbForfaits', async (req, res) => {
    const clientTs = await ClientType.find({})
    try {
        await clientTs.forEach(async clients => {
            if (clients._id == "5f167fae24124d1b60b897a9") {
                clients.forfaits = [
                    {
                        idForfait: "5f3517be54b68d07945790c9",
                        price: 30000,
                        name: "Livraison à domicile"

                    },

                    {
                        idForfait: "5f17df05d3194c205c55612e",
                        price: 60000,
                        name: "Collecte"

                    },
                    {
                        idForfait: "5f35180854b68d07945790cb",
                        price: 3000,
                        name: "Sous Couvert S/C"

                    },

                ]
                await clients.save()
            } else {
                clients.forfaits = [
                    {
                        idForfait: "5f17def8d3194c205c55612d",
                        price: 60000,
                        name: "Livraison à domicile"

                    },
                    {
                        idForfait: "5f17df05d3194c205c55612e",
                        price: 60000,
                        name: "Collecte"

                    },
                    {
                        idForfait: "5f17df35d3194c205c556131",
                        price: 10000,
                        name: "Sous Couvert S/C"

                    },
                    {
                        idForfait: "5f3517b554b68d07945790c8",
                        price: 40000,
                        name: "Livraison à domicile"

                    },
                    {
                        idForfait: "5f35185a81fa973e10d7c0c0",
                        price: 10000,
                        name: "Changement de statut"

                    },

                ]
                await clients.save()
            }
        });
        return res.status(201).send(clientTs)
    } catch (error) {
        return res.status(404).send(error)
    }
})

module.exports = router