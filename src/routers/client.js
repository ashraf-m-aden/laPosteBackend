const express = require("express");
const router = new express.Router();
const Client = require("../models/client");
const CB = require("../models/clientBoite");
const Boites = require("../models/boite");
const auth = require("../middleware/auth");
const HF = require("../models/historiqueForfait");
const HP = require("../models/historiquePaiements");
const Boite = require("../models/boite");
const HO = require("../models/historicOperations");
const CT = require("../models/clientType");
const ACTUAL = require("../models/actual");
const ALLH = require("../models/allhistorics");
router.post("/client", auth, async (req, res) => {
  const client = await new Client(req.body);
  try {
    client.save();
    return res.status(201).send(client);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/allClients", async (req, res) => { // c'est pour mettre tous les clients, remplacer par la troisiemme
  const actuals = await ALLH.find({});
  try {
    actuals.forEach(async (actual) => {
      var client = {
        name: actual.clientName,
      };
      if (actual.Type.toLowerCase() === "ind") {
        (client.idClientType = "5f167fae24124d1b60b897a9"), (client.clientType = "IND");
      }
      if (actual.Type.toLowerCase() === "org") {
        (client.idClientType = "5f167fc224124d1b60b897aa"), (client.clientType = "ORG");
      }
      if (actual.Type.toLowerCase() === "cd") {
        (client.idClientType = "5f16808724124d1b60b897ab"), (client.clientType = "CD");
      }
      if (actual.Type.toLowerCase() === "spr") {
        (client.idClientType = "5f1680ab24124d1b60b897ac"), (client.clientType = "SPR");
      }
      if (actual.Type.toLowerCase() === "spp") {
        (client.idClientType = "5f1680fb24124d1b60b897ad"), (client.clientType = "SPP");
      }
      if (actual.Type.toLowerCase() === "ass") {
        (client.idClientType = "5f16818424124d1b60b897af"), (client.clientType = "ASS");
      }
      if (actual.Type.toLowerCase() === "adm") {
        (client.idClientType = "5f17eac1b6b339333ca259b7"), (client.clientType = "ADM");
      }
      const new_client = await new Client(client)
      await new_client.save()

    });
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post("/fixClients", async (req, res) => { // pour corriger ce qui manque de la fonction suivante
  const cbs = await CB.find({})
  var i = 0
  await cbs.forEach(async (cb) => {
    const client = await Client.findById({ _id: cb.idClient })
    const actual = await ALLH.findOne({ clientName: cb.clientName, Rdv: cb.startDate, NBP: cb.boiteNumber })
    const cat = actual.Cat
    if (client.clientType === "IND") {
      if (cat.toLowerCase() === "gr") {
        cb.boiteType = "Grande";
        cb.idBoiteType = "5f17e00d37824a17b83d07a5";
        await cb.save();
      }
      if (cat.toLowerCase() === "bl") {
        cb.boiteType = "BL";
        cb.idBoiteType = "5f17f0323cc901299856629e";
        await cb.save();
      }
      if (cat.toLowerCase() === "mo") {
        cb.boiteType = "Moyenne";
        cb.idBoiteType = "5f17e01b37824a17b83d07a7";
        await cb.save();
      }
      if (cat.toLowerCase() === "pe") {
        console.log(cat);
        cb.boiteType = "Petite";
        cb.idBoiteType = "5f17e01437824a17b83d07a6";
        await cb.save();
      }
    } else {
      if (cat.toLowerCase() === "pe") {
        console.log(cat);
        cb.boiteType = "Petite";
        cb.idBoiteType = "5f17e01437824a17b83d07a6";
        await cb.save();
      }
      if (cat.toLowerCase() === "bl") {
        cb.boiteType = "BL";
        cb.idBoiteType = "5f17f0323cc901299856629e";
        await cb.save();
      }
      if (cat.toLowerCase() === "mo") {
        cb.boiteType = "Moyenne";
        cb.idBoiteType = "5f317a650f5f5b445cf1379c";
        await cb.save();
      }
      if (cat.toLowerCase() === "gr") {
        cb.boiteType = "Grande";
        cb.idBoiteType = "5f17e00d37824a17b83d07a5";
        await cb.save();
      }
    }
  });
  res.send({ cnt: cbs.length })
});
router.post("/clients", async (req, res) => { // c'est pour mettre les clients pui les client boites
  const actuals = await ALLH.find({});

  try {
    var i = 0;
    await actuals.forEach(async (actual) => {
      const boite = await Boites.findOne({ number: actual.NBP });
      //    const client = await Client.findOne({ name: actual.clientName });
      //    const clientb = await CB.findOne({ idClient: client._id })
      if (boite) {
        var client = {
          name: actual.clientName,
        };
        if (actual.Type.toLowerCase() === "ind") {
          (client.idClientType = "5f167fae24124d1b60b897a9"), (client.clientType = "IND");
        }
        if (actual.Type.toLowerCase() === "org") {
          (client.idClientType = "5f167fc224124d1b60b897aa"), (client.clientType = "ORG");
        }
        if (actual.Type.toLowerCase() === "cd") {
          (client.idClientType = "5f16808724124d1b60b897ab"), (client.clientType = "CD");
        }
        if (actual.Type.toLowerCase() === "spr") {
          (client.idClientType = "5f1680ab24124d1b60b897ac"), (client.clientType = "SPR");
        }
        if (actual.Type.toLowerCase() === "spp") {
          (client.idClientType = "5f1680fb24124d1b60b897ad"), (client.clientType = "SPP");
        }
        if (actual.Type.toLowerCase() === "ass") {
          (client.idClientType = "5f16818424124d1b60b897af"), (client.clientType = "ASS");
        }
        if (actual.Type.toLowerCase() === "adm") {
          (client.idClientType = "5f17eac1b6b339333ca259b7"), (client.clientType = "ADM");
        }
        const new_client = await new Client(client)
        await new_client.save()
        var cb = await new CB();
        cb.idBoite = boite._id;
        cb.boiteNumber = boite.number;
        cb.clientName = new_client.name;
        cb.idClient = new_client._id;
        cb.idClientType = new_client.idClientType;
        cb.clientType = new_client.clientType;
        cb.startDate = actual.Rdv;
        await cb.save();
        if (parseInt(actual.Rdv) === 2020) {
          cb.status = "A jour";
          cb.bg = "background:green";
          cb.idStatus = "5f211bafc9518f4404e03c2c";
          await cb.save();

        } else if (parseInt(actual.Rdv) >= 2018 && parseInt(actual.Rdv) < 2020) {
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
        if (client.clientType === "IND") {
          if (actual.Cat.toLowerCase() === "mo") {
            cb.boiteType = "Moyenne";
            cb.idBoiteType = "5f17e01b37824a17b83d07a7";
            await cb.save();
          }
          if (actual.Cat.toLowerCase() === "pe") {
            cb.boiteType = "Petite";
            cb.idBoiteType = "5f17e01437824a17b83d07a6";
            await cb.save();
          }
        } else {
          if (actual.Cat.toLowerCase() === "mo") {
            cb.boiteType = "Moyenne";
            cb.idBoiteType = "5f317a650f5f5b445cf1379c";
            await cb.save();
          }
          if (actual.Cat.toLowerCase() === "gr") {
            cb.boiteType = "Grande";
            cb.idBoiteType = "5f17e00d37824a17b83d07a5";
            await cb.save();
          }
        }
      } else {
        console.log("la boite " + actual.NBP);
      }

    });
    return await res.status(201).send();
  } catch (error) {
    res.status(400).send(error.response);
  }
});

router.post("/modifyClient/:id", auth, async (req, res) => {
  try {
    const client = await Client.findById({ _id: req.params.id });
    const cb = await CB.findOne({ idClient: req.params.id });
    const clientType = await CT.findById({ _id: req.body.idClientType });
    if (!client || !cb || !clientType) {
      return res.status(404).send("Le client n'existe pas");
    }

    client.name = req.body.name;
    client.email = req.body.email;
    client.number = req.body.number;
    client.address = req.body.address;
    client.idClientType = req.body.idClientType;
    cb.idClientType = clientType._id;
    cb.clientType = clientType.name;
    await cb.save();
    await client.save();

    return res.send({ cb, client });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/deleteClient/:id", auth, auth, async (req, res) => {
  const client = Client.findById({ _id: req.id });
  if (!client) {
    return res.statut(404).send("Le client n'existe pas");
  }
  try {
    client.enabled = !client.enabled; // j'active ou desactive le client
    const cb = await CB.findOne({ idClient: client._id, enabled: true });
    if (cb) {
      cb.status = "Resilié";
      cb.bg = "background:red";
      cb.idStatus = "5f211c19c9518f4404e03c2e";
      cb.idStaff = req.staff._id;
      cb.releaseDate = new Date();
      cb.enabled = false;
      await cb.save();
      const boite = await Boite.findOne({ _id: cb.idBoite });
      boite.enabled = false;
      await boite.save();
    }
    await client.save();
    res.status(201).send(client);
  } catch (error) {
    res
      .status(500)
      .send(
        "Une erreur est survenue lors de la modification veuillez réessayer."
      );
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/client/:id", async (req, res) => {
  // get one client
  try {
    const client = await Client.findById({ _id: req.params.id });
    if (!client) {
      return res.status(404).send("Client inexistant");
    }
    res.status(200).send(client);
  } catch (error) {
    res.status(500).send("Un problem est survenu veuillez reessayer");
  }
});
router.get("/clients", async (req, res) => {
  // get All client
  try {
    const clients = await Client.find({ enabled: true });
    if (!clients) {
      return res.status(404).send("Pas de clients");
    }
    res.status(200).send(clients);
  } catch (error) {
    res.status(500).send("Problem de serveur");
  }
});
router.get("/remove", async (req, res) => {
  // get the boxes of one client
  try {
    const clients = await Client.find({ name: "Ashraf Mohamed" });
    if (!clients) {
      return res.status(404).send("Client inexistant");
    }
    clients.forEach(async (client) => {
      const hfs = await HF.findOne({ idClient: client._id });
      const hps = await HP.findOne({ idClient: client._id });
      const cb = await CB.findOne({ idClient: client._id });
      const ho = await HO.findOne({ idClient: client._id });
      const boite = await Boite.findById({ _id: cb.idBoite });
      if (boite) {
        boite.enabled = false;
        await boite.save();
      }
      if (hfs) {
        await hfs.remove();
      }
      if (ho) {
        await ho.remove();
      }
      if (cb) {
        await cb.remove();
      }
      if (hps) {
        await hps.remove();
      }
      await client.remove();
    });
    res.status(200).send(clients);
  } catch (error) {
    res.status(500).send("Un problem est survenu veuillez reessayer");
  }
});

router.post("/updateClient/:id", async (req, res) => {
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
router.post("/updateClientCB", async (req, res) => {
  try {
    var i = 0;
    const boites = await Boites.find({});
    await boites.forEach(async (boite) => {
      const cb = await CB.find({ idBoite: boite._id });
      if (cb) {
        boite.enabled = false;
        await boite.save();
      }
    });
    return res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/updateClientb", async (req, res) => {
  try {
    const client = await CB.find({});
    await client.forEach(async (element) => {
      if (element.status === "A jour" || element.status === "En retard") {
        element.enabled = true;
        element.NA = false;
        await element.save();
      } else {
        element.enabled = false;
        element.NA = false;
        await element.save();
      }
    });

    return res.status(201).send(client);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
