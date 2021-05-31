const express = require("express")
const router = new express.Router()
const Company = require("../models/company")

router.post('/company', async (req, res) => {
    
    try {
        const company = new Company(req.body)
        await company.save()
        return res.status(201).send(company)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/company', async (req, res) => {
    
    try {
        const companys = await Company.find({})
        return res.status(201).send(companys)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/company/:id', async (req, res) => {  // get one company
    try {
        const company = await Company.findById({ _id: req.params.id })
        if (!company) {
            return res.status(404).send('company inexistant')
        }
        res.status(200).send(company)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.patch('/company/:id', async (req, res) => {  // get one company
    try {
        let company = await Company.findById({ _id: req.params.id })
        let newCountryId = req.body
        if (!company) {
            return res.status(404).send('company inexistant')
        }
        company.countries.push(newCountryId)
        await company.save()
        res.status(200).send(company)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.delete('/company/:id', async (req, res) => {  // get one company
    try {
        const company = await Company.findById({ _id: req.params.id })
        if (!company) {
            return res.status(404).send('company inexistant')
        }
        company.enabled = false;
        await company.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})

module.exports = router