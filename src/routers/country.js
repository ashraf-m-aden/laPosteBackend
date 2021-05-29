const express = require("express")
const router = new express.Router()
const Branch = require("../models/branch")
const Country = require("../models/country")

router.post('/branch', async (req, res) => {
    
    try {
        const branch = new Branch(req.body)

        await branch.save()
        return res.status(201).send(branch)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/branch', async (req, res) => {
    
    try {
        const branchs = await Branch.find({})
        return res.status(201).send(branchs)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/branch/:id', async (req, res) => {  // get one branch
    try {
        const branch = await Branch.findById({ _id: req.params.id })
        if (!branch) {
            return res.status(404).send('branch inexistant')
        }
        res.status(200).send(branch)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.get('/branchs/:id', async (req, res) => {  // get one branch
    try {
        const branchs = await Branch.find({ companyId: req.params.id })
        if (!branchs) {
            return res.status(404).send('branch inexistant')
        }
        res.status(200).send(branchs)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.delete('/branch/:id', async (req, res) => {  // delete one branch
    try {
        const branch = await Branch.findById({ _id: req.params.id })
        if (!branch) {
            return res.status(404).send('branch inexistant')
        }
        branch.enabled = false;
        await branch.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.post('/country', async (req, res) => {
    
    try {
        const country = new Country(req.body)

        await country.save()
        return res.status(201).send(country)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/country', async (req, res) => {
    
    try {
        const countrys = await Country.find({})
        return res.status(201).send(countrys)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/country/:id', async (req, res) => {  // get one country
    try {
        const country = await Country.findById({ _id: req.params.id })
        if (!country) {
            return res.status(404).send('country inexistant')
        }
        res.status(200).send(country)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})



module.exports = router