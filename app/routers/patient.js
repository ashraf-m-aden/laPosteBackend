const express = require("express")
const router = new express.Router()
const Patient = require("../models/patient")
const auth = require('../middleware/auth')


router.post('/patient', auth, async (req, res) => {
    
    try {
        const patient = new Patient(req.body)

        await patient.save()
        return res.status(200).send(patient)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/patients', auth, async (req, res) => {
    
    try {
        const patients = await Patient.find({})
        return res.status(200).send(patients)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/patient/:id', auth, async (req, res) => {  // get one patient
    try {
        const patient = await Patient.findById({ _id: req.params.id })
        if (!patient) {
            return res.status(404).send('patient inexistant')
        }
        res.status(200).send(patient)
    } catch (error) {
        res.status(500).send('Un probleme est survenu veuillez reessayer')
    }
})
router.patch('/patient/:id', auth, async (req, res) => {  // modify a patient
    try {
        const patient = await Patient.findById({ _id: req.params.id })
        if (!patient) {
            return res.status(404).send('patient inexistant')
        }
        patient.patient = req.body.params.patient
        await patient.save()
        res.status(200).send(patient)
    } catch (error) {
        res.status(500).send('Un probleme est survenu veuillez reessayer')
    }
})



module.exports = router