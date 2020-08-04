const express = require("express")
const router = new express.Router()
const Staff = require("../models/staff")
const auth = require('../middleware/auth')

router.post('/staff',auth, async (req, res) => {
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
    const staff = Staff.findById({_id:req.id})
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

router.post('/staff/login', async (req, res) => {
    try {
        const staff = await Staff.findByCredentials(req.body.email, req.body.password);
        const token = await staff.generateToken()
        return res.status(201).send({ staff, token })
    } catch (e) {
        res.status(404).send('Email ou mot de passe erroné')
    }
})
router.get('/staff/logout', auth, async (req, res) => {
    try {
        req.staff.tokens = req.staff.tokens.filter((token) => { return token.token !== req.token })
        await req.staff.save()
        res.status(201).send()
    } catch (error) {
        res.status(404).send(error)

    }
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/staff/:id', auth, async (req, res) => {  // get one staff
    try {
        const staff = await Staff.findById({ _id: req.id })
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
        const staffs = await Staff.find({})
        if (!staffs) {
            return res.status(404).send('Pas de staffs')
        }
        res.status(200).send(staffs)
    } catch (error) {
        res.status(500).send('Problem de serveur')
    }
})
    
module.exports = router