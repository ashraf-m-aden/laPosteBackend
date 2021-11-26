const express = require("express")
const router = new express.Router()
const Ordonnance = require("../models/ordonnance")
const Consultation = require("../models/consultation")
const auth = require('../middleware/auth')


//////////////////////// NOUVELLE CONSULTATION

router.post('/consultation',auth, async (req, res) => { // poster une consultation medicale
    
    try {
        const consultation = new Consultation(req.body)

        await consultation.save()
        return res.status(200).send(consultation)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/consultations/:id', auth, async (req, res) => {  // retrouver toutes les consultations medicales
    
    try {
        const consultations = await Consultation.find({idPatient: req.params.id})
        return res.status(200).send(consultations)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/consultation/:id', auth, async (req, res) => {  // get one consultation medicale
    try {
        const consultation = await Consultation.findById({ _id: req.params.id })
        if (!consultation) {
            return res.status(404).send('consultation inexistante')
        }
        res.status(200).send(consultation)
    } catch (error) {
        res.status(500).send('Un probleme est survenu veuillez reessayer')
    }
})
router.get('/consultations/user/:id', auth, async (req, res) => {  // get one consultation medicale
    try {
        const consultation = await Consultation.find({ idPatient: req.params.id })
        if (!consultation) {
            return res.status(404).send('consultation inexistante')
        }
        res.status(200).send(consultation)
    } catch (error) {
        res.status(500).send('Un probleme est survenu veuillez reessayer')
    }
})
router.patch('/consultation/:id', auth, async (req, res) => {  // modify une consultation medicale
    try {
        const consultation = await Consultation.findById({ _id: req.params.id })
        if (!consultation) {
            return res.status(404).send('consultation inexistant')
        }
        consultation.medicaments = req.body.medicaments
        await consultation.save()
        res.status(200).send(consultation)
    } catch (error) {
        res.status(500).send('Un probleme est survenu veuillez reessayer')
    }
})







//////////////////////// ORDONNANCE MEDICAL

router.post('/ordonnance', async (req, res) => { // poster une ordonnance medicale
    
    try {
        const ordonnance = new Ordonnance(req.body)

        await ordonnance.save()
        return res.status(200).send(ordonnance)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/ordonnances', async (req, res) => {  // retrouver toutes les ordonnances medicales
    
    try {
        const ordonnances = await Ordonnance.find({})
        return res.status(200).send(ordonnances)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/ordonnance/:id', auth, async (req, res) => {  // get one ordonnance medicale
    try {
        const ordonnance = await Ordonnance.findById({ _id: req.params.id })
        if (!ordonnance) {
            return res.status(404).send('ordonnance inexistante')
        }
        res.status(200).send(ordonnance)
    } catch (error) {
        res.status(500).send('Un probleme est survenu veuillez reessayer')
    }
})
router.patch('/ordonnance/:id', auth, async (req, res) => {  // modify une ordonnance medicale
    try {
        const ordonnance = await Ordonnance.findById({ _id: req.params.id })
        if (!ordonnance) {
            return res.status(404).send('ordonnance inexistant')
        }
        ordonnance.medicaments = req.body.medicaments
        await ordonnance.save()
        res.status(200).send(ordonnance)
    } catch (error) {
        res.status(500).send('Un probleme est survenu veuillez reessayer')
    }
})




//////////////////////// ORDONNANCE ANALYSE

router.post('/analyse', async (req, res) => { // poster une ordonnance analyse
    
    try {
        const analyse = new Analyse(req.body)

        await analyse.save()
        return res.status(200).send(analyse)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/analyses', async (req, res) => {  // retrouver toutes les ordonnances medicales
    
    try {
        const analyses = await Analyse.find({})
        return res.status(200).send(analyses)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/analyse/:id', auth, async (req, res) => {  // get one ordonnance medicale
    try {
        const analyse = await Analyse.findById({ _id: req.params.id })
        if (!analyse) {
            return res.status(404).send('analyse inexistante')
        }
        res.status(200).send(analyse)
    } catch (error) {
        res.status(500).send('Un probleme est survenu veuillez reessayer')
    }
})
router.patch('/analyse/:id', auth, async (req, res) => {  // modify une ordonnance medicale
    try {
        const analyse = await Analyse.findById({ _id: req.params.id })
        if (!analyse) {
            return res.status(404).send('analyse inexistant')
        }
        analyse.medicaments = req.body.medicaments
        await analyse.save()
        res.status(200).send(analyse)
    } catch (error) {
        res.status(500).send('Un probleme est survenu veuillez reessayer')
    }
})



module.exports = router