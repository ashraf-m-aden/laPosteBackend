const express = require("express")
const router = new express.Router()
const Staff = require("../models/staff")
const auth = require('../middleware/auth')

router.post('/staffs', auth, async (req, res) => {
    const staff = new Staff(req.body)
    try {
        staff.save()
        return res.status(201).send(staff)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/staff/:id', auth, async (req, res) => {
    const staff = Staff.findById({_id:req.id})
    if (!staff) {
        return res.statut(404).send("Le staff n'existe pas")
    }
    try {
        staff.name = req.body.name
        staff.email = req.body.email
        staff.password = req.body.password
        staff.idstaffType = req.body.idstaffType
        staff.enabled = req.body.enabled
        await staff.save()
        return res.send(staff)
    } catch (error) {
        res.status(500).send("Une erreur est survenue, veuillez recommencer.")
    }
})

router.delete('/staff/:id',auth,async(req,res)=>{
    const staff = staff.findById({_id:req.id})
    if (!staff) {
        return res.statut(404).send("Le staff n'existe pas")
    }
    try {
        staff.enabled = !staff.enabled  // j'active ou desactive le staff
        staff.save()  
        res.status(201).send(staff)

    } catch (error) {
        res.status(500).send("Une erreur est survenue lors de la modification veuillez réessayer.")
    }

})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/staff/:id', auth, async (req, res) => {  // get one staff
    try {
        const staff = await staff.findById({ _id: req.id })
        if (!staff) {
            return res.status(404).send('staff inexistant')
        }
        res.status(200).send(staff)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.get('/staffs', auth, async (req, res) => {  // get All staff
    try {
        const staffs = await staff.find({})
        if (!staffs) {
            return res.status(404).send('Pas de staffs')
        }
        res.status(200).send(staffs)
    } catch (error) {
        res.status(500).send('Problem de serveur')
    }
})
    
module.exports = router