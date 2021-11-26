const express = require("express")
const router = new express.Router()
const Role = require("../models/role")
const auth = require('../middleware/auth')


router.post('/role', async (req, res) => {
    
    try {
        const role = new Role(req.body)

        await role.save()
        return res.status(200).send(role)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/roles', auth, async (req, res) => {
    
    try {
        const roles = await Role.find({})
        return res.status(200).send(roles)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/role/:id', async (req, res) => {  // get one role
    try {
        const role = await Role.findById({ _id: req.params.id })
        if (!role) {
            return res.status(404).send('role inexistant')
        }
        res.status(200).send(role)
    } catch (error) {
        res.status(500).send('Un probleme est survenu veuillez reessayer')
    }
})
router.patch('/role/:id', auth, async (req, res) => {  // modify a role
    try {
        const role = await Role.findById({ _id: req.params.id })
        if (!role) {
            return res.status(404).send('role inexistant')
        }
        role.role = req.body.params.role
        await role.save()
        res.status(200).send(role)
    } catch (error) {
        res.status(500).send('Un probleme est survenu veuillez reessayer')
    }
})



module.exports = router