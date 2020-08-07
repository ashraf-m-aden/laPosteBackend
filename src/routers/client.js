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
const updateClient = async (id) => {
    const hps = await HP.find({ idClient: id })
    const client = await Client.findById({ _id: id })
    await hps.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        }
        if (b.date < a.date) {
            return -1;
        }
        return 0;
    });
    const date = new Date().getFullYear()
    if ((date - hps[0].date) === 0) {
        client.status = "A jour"
        client.bg = "background:green"
        client.idStatus = "5f211bafc9518f4404e03c2c"
        client.save()
    } else if ((date - hps[0].date) > 1 && (date - hps[0].date) < 4) {
        client.status = "En retard"
        client.bg = "background:yellow"
        client.idStatus = "5f211bd5c9518f4404e03c2d"
        client.save()
    } else {
        client.status = "Resilié"
        client.bg = "background:red"
        client.idStatus = "5f211c19c9518f4404e03c2e"
        client.u()
    }
}
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

router.get('/client/:id',  async (req, res) => {  // get one client
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
            const boite = await Boites.findById({ _id: client.idBoite })
            if (hfs) {
                await hfs.remove()
            }
            if (hps) {
                await hps.remove()
            }
            if (boite) {
                boite.enabled = true
                await boite.save()
            }
            await client.remove()
        });
        res.status(200).send(clients)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.post('/updateClient/:id', async (req, res) => {
  try {
      const hps = await HP.find({ idClient: req.params.id })
      const client = await Client.findById({ _id: req.params.id })
      await hps.sort((a, b) => {
          if (a.date < b.date) {
              return 1;
          }
          if (b.date < a.date) {
              return -1;
          }
          return 0;
      });
      const date = new Date().getFullYear()
      if ((date - hps[0].date) === 0) {
          client.status = "A jour"
          client.bg = "background:green"
          client.idStatus = "5f211bafc9518f4404e03c2c"
          await client.save()
      } else if ((date - hps[0].date) >= 1 && (date - hps[0].date) < 4) {
          client.status = "En retard"
          client.bg = "background:yellow"
          client.idStatus = "5f211bd5c9518f4404e03c2d"
          await client.save()
      } else {
          client.status = "Resilié"
          client.bg = "background:red"
          client.idStatus = "5f211c19c9518f4404e03c2e"
          await client.save()
      }
      return res.status(201).send(client)
  } catch (error) {
      res.status(500).send(error)

  }

})


module.exports = router