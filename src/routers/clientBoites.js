const express = require("express");
const router = new express.Router();
const IMP = require('../models/payes')
const CB = require('../models/clientBoite')
const CLIENT = require('../models/client')
const CLIENTYPE = require('../models/clientType')
const BOITE = require('../models/boite')
const BOITETYPE = require('../models/boiteType')
const auth = require('../middleware/auth')

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
        const clients = await CB.find({ status: ['A jour', 'En retard'] });
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
        const hps = await HP.find({ idClient: req.params.id });
        const client = await CB.findOne({ idClient: req.params.id });
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
        return res.status(201).send(client);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/checkClientBoite", async (req, res) => {
    try {
        const imps = await IMP.find({});
        await imps.forEach(async imp => {
            const cb = await CB.findOne({ clientName: imp.clientName, boiteNumber: imp.NBP })
            if (cb) {
                //    if (date - hps[0].date === 0) {
                cb.status = "A jour";
                cb.bg = "background:green";
                cb.idStatus = "5f211bafc9518f4404e03c2c";
                //        await client.save();
                //    } else if (date - hps[0].date >= 1 && date - hps[0].date < 4) {
                // cb.status = "En retard";
                // cb.bg = "background:yellow";
                // cb.idStatus = "5f211bd5c9518f4404e03c2d";
                //        await client.save();
                //    } else {
                // cb.status = "Resilié";
                // cb.bg = "background:red";
                // cb.idStatus = "5f211c19c9518f4404e03c2e";
                // cb.startDate = imp.Rdv
                await cb.save();

            }
            else {
                const client = await new CB()
                client.boiteNumber = imp.NBP
                client.clientName = imp.clientName
                client.status = "A jour";
                client.bg = "background:green";
                client.idStatus = "5f211bafc9518f4404e03c2c";
                client.startDate = imp.Rdv
                client.NA = false
                const boite = await BOITE.findOne({ number: imp.NBP })
                if (boite) {
                    client.idBoite = boite._id
                    const cl = await CLIENT.findOne({ name: imp.clientName })
                    if (cl) {
                        if (cl.clientType === "IND") {
                            if (imp.Cat.toLowerCase() === "mo") {
                                client.boiteType = "Moyenne"
                                client.idBoiteType = "5f17e01b37824a17b83d07a7"
                            }
                            if (imp.Cat.toLowerCase() === "pe") {

                                client.boiteType = "Petite"
                                client.idBoiteType = "5f17e01437824a17b83d07a6"
                            }

                        }
                        else {
                            if (imp.Cat.toLowerCase() === "mo") {

                                client.boiteType = "Moyenne"
                                client.idBoiteType = "5f317a650f5f5b445cf1379c"
                                await cb.save()
                            }
                            if (imp.Cat.toLowerCase() === "gr") {
                                client.boiteType = "Grande"
                                client.idBoiteType = "5f17e00d37824a17b83d07a5"
                                await cb.save()
                            }
                        }
                        const cts = await CLIENTYPE.find({})
                        await cts.forEach(element => {
                            if (element.name.toLowerCase() === imp.Cat.toLowerCase()) {
                                client.clientType = element.name
                                client.idClientType = element._id
                            }
                        });
                        await client.save()
                    } else {
                        console.log(imp);
                    }
                } else {
                    console.log(imp);
                }

            }
        });


        return res.status(201).send({ message: 'c\'est bon' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router