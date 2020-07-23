const express = require("express")
const router = new express.Router()
const StaffType = require("../models/staffType")

router.post('/staffT', async (req, res) => {
    
    try {
        const staffT = new StaffType(req.body)

        await staffT.save()
        return res.status(201).send(staffT)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/staffT', async (req, res) => {
    
    try {
        const staffTs = await StaffType.find({})
        return res.status(201).send(staffTs)
    } catch (error) {
        return res.status(404).send(error)
    }
})

module.exports = router