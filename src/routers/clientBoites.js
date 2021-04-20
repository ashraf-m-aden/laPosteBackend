const express = require("express");
const router = new express.Router();
const IMP = require('../models/payes')
const CB = require('../models/clientBoite')
const CLIENT = require('../models/client')
const CLIENTYPE = require('../models/clientType')
const BOITE = require('../models/boite')
const BOITETYPE = require('../models/boiteType')
const auth = require('../middleware/auth')
const ALLH = require('../models/allhistorics');
const HistoricP = require("../models/historiquePaiements");
router.post("/clientBoite", auth, async (req, res) => {
    const clientBoite = await new CB(req.body);
    try {
        const boite = await BOITE.findById({ _id: clientBoite.idBoite })
        boite.enabled = true
        await boite.save()
        await clientBoite.save();
        return res.status(201).send(clientBoite);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get("/clientBoites", async (req, res) => {
    // get All clientboite
    try {
        const clients = await CB.find({ status: ['A jour', 'En retard', 'Exoneré'] });
        if (!clients) {
            return res.status(404).send("Pas de clients");
        }
        res.status(200).send(clients);
    } catch (error) {
        res.status(500).send("Problem de serveur");
    }
});
router.get("/allClientBoites", async (req, res) => {
    // get All clientboite
    try {
        const clients = await CB.find({});
        if (!clients) {
            return res.status(404).send("Pas de clients");
        }
        res.status(200).send(clients);
    } catch (error) {
        res.status(500).send("Problem de serveur");
    }
});
router.get("/clientBoiteRED", async (req, res) => {
    // get All clientboite
    try {
        const clients = await CB.find({ status: 'Resilié' });
        if (!clients) {
            return res.status(404).send("Pas de clients");
        }
        res.status(200).send(clients);
    } catch (error) {
        res.status(500).send("Problem de serveur");
    }
});
router.post("/clientBoites", async (req, res) => {
    // post All clientboite
    try {
        const clients = await CB.find({});
        if (!clients) {
            return res.status(404).send("Pas de clients");
        } else {
            clients.forEach(async (element) => {
                if (element.status === "Resilié") {
                    element.enabled = false;
                    await element.save();
                }
            });
        }
        res.status(200).send(clients);
    } catch (error) {
        res.status(500).send("Problem de serveur");
    }
});

router.get("/clientBoites/:id", async (req, res) => {
    // get the boxes of one client
    try {
        const client = await CB.findOne({ idClient: req.params.id });
        if (!client) {
            return res.status(404).send("Client inexistant");
        }
        res.status(200).send(client);
    } catch (error) {
        res.status(500).send("Un problem est survenu veuillez reessayer");
    }
});

router.get("/clientBoite/:id", async (req, res) => {
    // get the box of one client
    try {
        const client = await CB.find({ enabled: true, idClient: req.params.id });
        const results = await client.filter((cl) => !cl.boiteType);
        // if (!client) {
        //     return res.status(404).send('Client inexistant')
        // }
        res.status(200).send(results[1234]);
    } catch (error) {
        res.status(500).send("Un problem est survenu veuillez reessayer");
    }
});

router.post("/updateClientBoite/:id", async (req, res) => {
    try {
        const clients = await CB.find({});
        clients.forEach(async client => {
            if (client.startDate === "2020") {
                client.status = "A jour";
                client.bg = "background:green";
                client.idStatus = "5f211bafc9518f4404e03c2c";
                await client.save();
            } else if (parseInt(client.startDate) >= 2018 && parseInt(client.startDate) < 2020) {
                client.status = "En retard";
                client.bg = "background:yellow";
                client.idStatus = "5f211bd5c9518f4404e03c2d";
                await client.save();
            } else {
                client.status = "Resilié";
                client.bg = "background:red";
                client.idStatus = "5f211c19c9518f4404e03c2e";
                await client.save();
            }
        });
        return res.status(201).send(client);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/checkClientBoite/:id", async (req, res) => {
    try {
        const client = await CB.findOne({ idClient: req.params.id });
        const hps = await HistoricP.find({ idClient: req.params.id, enabled: true });
        await hps.sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            }
            if (b.date < a.date) {
                return -1;
            }
            return 0;
        });
        const date = new Date().getFullYear();
        if (date - hps[0].date === 0) {
            client.status = "A jour";
            client.bg = "background:green";
            client.idStatus = "5f211bafc9518f4404e03c2c";
            await client.save();
        } else if (date - hps[0].date >= 1 && date - hps[0].date < 4) {
            client.status = "En retard";
            client.bg = "background:yellow";
            client.idStatus = "5f211bd5c9518f4404e03c2d";
            await client.save();
        } else {
            client.status = "Resilié";
            client.bg = "background:red";
            client.idStatus = "5f211c19c9518f4404e03c2e";
            await client.save();
        }


        return res.status(201).send({ message: 'c\'est bon' });
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post('/checkAllClientBoites', async (req, res) => { // pour mettre le status des client boites
    try {
        const cbs = await CB.find({})
        await cbs.forEach(async cb => {
            const actual = await ALLH.findOne({ clientName: cb.clientName, Rdv: cb.startDate, NBP: cb.boiteNumber })

            if (parseInt(cb.startDate) === 2020) {
                cb.status = "A jour";
                cb.bg = "background:green";
                cb.idStatus = "5f211bafc9518f4404e03c2c";
                await cb.save();
            } else if (parseInt(cb.startDate) >= 2018 && parseInt(cb.startDate) < 2020) {
                cb.status = "En retard";
                cb.bg = "background:yellow";
                cb.idStatus = "5f211bd5c9518f4404e03c2d";
                await cb.save();

            } else {
                cb.status = "Resilié";
                cb.bg = "background:red";
                cb.idStatus = "5f211c19c9518f4404e03c2e";
                await cb.save();
            }
        });
        return res.status(200).send()
    } catch (error) {
        return res.status(500).send(error)
    }
})


router.post('/checkExonerer', async (req, res) => { // pour mettre le status exonerer des client boites
    try {
        const actuals = await ALLH.find({ Etat: "EX" })
        await actuals.forEach(async actual => {
            const cb = await CB.findOne({ clientName: actual.clientName, startDate: actual.Rdv, boiteNumber: actual.NBP })
            if (cb) {
                console.log(actual.NBP);
                cb.status = "Exoneré";
                cb.bg = "background:#1d918b";
                cb.idStatus = "5f65be8d5b8c2632989df0dc";
                await cb.save();
            }

        });
        return res.status(200).send()
    } catch (error) {
        return res.status(500).send(error)
    }
})
module.exports = router