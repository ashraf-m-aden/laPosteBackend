const express = require("express");
const router = new express.Router();
const Client = require("../models/client");
const CB = require("../models/clientBoite");
const PAYES = require("../models/payes");
const RETARDS = require("../models/retard");
const IMPAYES = require("../models/impayes");
const Boites = require("../models/boite");
const EXBOITES = require("../models/exboites");
const CS = require("../models/clientStatus");
const auth = require("../middleware/auth");
const HF = require("../models/historiqueForfait");
const HP = require("../models/historiquePaiements");
const Boite = require("../models/boite");

router.post("/client", auth, auth, async (req, res) => {
  const client = new Client(req.body);
  try {
    client.save();
    return res.status(201).send(client);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/clients", async (req, res) => {
  // const clients = await Client.find({ enabled: true });
    const paye = await PAYES.find({});
 //   const boites = await Boites.find({});
 //   const exBoites = await ExBoites.find({});
   try {
       var i = 0
     await paye.forEach(async pay => {
         const boite = await Boites.findOne({ number: pay.NBP })
         const client = await Client.findOne({ name: pay.clientName })
       if (client) {
         if (boite) {
           var cb = await new CB()
           cb.idBoite = boite._id
           cb.boiteNumber = boite.number
           cb.clientName = client.name
           cb.idClient = client._id
           cb.idClientType = client.idClientType
           cb.clientType = client.clientType
           cb.idClient = client._id
           cb.startDate = boite.Rdv
           cb.status = client.status
           cb.idStatus = client.idStatus
           cb.bg = client.bg
             if (client.clientType === "IND") {
                 if (pay.Cat.toLowerCase() === "mo") {
                     cb.boiteType = "Moyenne"
                     cb.idBoiteType = "5f17e01b37824a17b83d07a7"
                     await cb.save()
                 }
                 if (pay.Cat.toLowerCase() === "pe") {

                     cb.boiteType = "Petite"
                     cb.idBoiteType = "5f17e01437824a17b83d07a6"
                     await cb.save()
                   }
             } 
             else {
                 if (pay.Cat.toLowerCase() === "mo") {

                     cb.boiteType = "Moyenne"
                     cb.idBoiteType = "5f317a650f5f5b445cf1379c"
                     await cb.save()
                   }
                 if (pay.Cat.toLowerCase() === "gr") {
                     cb.boiteType = "Grande"
                     cb.idBoiteType = "5f17e00d37824a17b83d07a5"
                     await cb.save()
                   }
              }
             }
       }
         
     });
    const exb = await CB.find()
     return await res.status(201).send({cnt:exb.length});
   } catch (error) {
     res.status(400).send(error.response);
   }
 });

router.patch("/client/:id", auth, auth, async (req, res) => {
  const client = Client.findById({ _id: req.id });
  if (!client) {
    return res.statut(404).send("Le client n'existe pas");
  }
  try {
    client.name = req.body.name;
    client.email = req.body.email;
    client.number = req.body.number;
    client.address = req.body.address;
    client.idClientType = req.body.idClientType;
    client.idBoite = req.body.idBoite;
    client.enabled = req.body.enabled;
    await client.save();
    return res.send(client);
  } catch (error) {
    res.status(500).send("Une erreur est survenue, veuillez recommencer.");
  }
});

router.delete("/client/:id", auth, auth, async (req, res) => {
  const client = Client.findById({ _id: req.id });
  if (!client) {
    return res.statut(404).send("Le client n'existe pas");
  }
  try {
    client.enabled = !client.enabled; // j'active ou desactive le client
    client.save();
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
router.get("/clientBoites", async (req, res) => {
  // get All clientboite
  try {
    const clients = await CB.find({ enabled: true });
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
    const clients = await CB.find({ enabled: false });
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
    const client = await CB.find({enabled: true, idClient:req.params.id});
    const results = await client.filter((cl) => !cl.boiteType);
    // if (!client) {
    //     return res.status(404).send('Client inexistant')
    // }
    res.status(200).send(results[1234]);
  } catch (error) {
    res.status(500).send("Un problem est survenu veuillez reessayer");
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
      const boite = await Boites.findById({ _id: client.idBoite });
      if (hfs) {
        await hfs.remove();
      }
      if (hps) {
        await hps.remove();
      }
      if (boite) {
        boite.enabled = true;
        await boite.save();
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
    const client = await Client.findById({ _id: req.params.id });
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
      var i =0
    const cbs = await CB.find({enabled:false});
    await cbs.forEach(async (cb) => {
      const client = await Client.findOne({ name: cb.clientName });
      if (client) {
          i++
        cb.idClient = client._id;
        console.log(i);
        await cb.save();
      }
    });
    const cb = await CB.find({});
    return res.status(201).send(cb);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post("/updateClientb", async (req, res) => {
  try {
    const client = await CB.find({});
    await client.forEach(async element => {
      if (element.status === "A jour" || element.status === "En retard") {
        element.enabled = true
        element.NA = false
        await element.save()
      } else {
        element.enabled = false
        element.NA = false
        await element.save()

      }
    });

    return res.status(201).send(client);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;