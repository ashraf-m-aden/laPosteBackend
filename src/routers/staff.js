const express = require("express")
const router = new express.Router()
const Staff = require("../models/staff")
const Admin = require("../models/admin")
const auth = require('../middleware/auth')

router.post('/staff', auth, async (req, res) => {
    const staff = new Staff(req.body)
    try {
        await staff.save()
        return res.status(201).send(staff)
    } catch (error) {
        res.status(400).send({'error':'Ce login est deja prit'})
    }
})
router.post('/owner', async (req, res) => {
    const admin = new Admin(req.body)
    try {
        await admin.save()
        return res.status(201).send(admin)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/owner/:id', auth, async (req, res) => {
    const admin = Admin.findById({ _id: req.id })
    if (!admin) {
        return res.statut(404).send("Le staff n'existe pas")
    }
    try {
        staff.name = req.body.name
        staff.login = req.body.login
        staff.password = req.body.password
        staff.enabled = true;
        await staff.save()
        return res.send(admin)
    } catch (error) {
        res.status(500).send("Une erreur est survenue, veuillez recommencer.")
    }
})
router.patch('/staff/:id', auth, async (req, res) => {
    const staff = Staff.findById({ _id: req.id })
    if (!staff) {
        return res.statut(404).send("Le staff n'existe pas")
    }
    try {
        staff.name = req.body.name
        staff.login = req.body.login
        staff.password = req.body.password
        staff.countryId = req.body.countryId
        staff.branchId = req.body.countryId
        staff.role = req.body.role
        staff.enabled = req.body.enabled
        await staff.save()
        return res.send(staff)
    } catch (error) {
        res.status(500).send("Une erreur est survenue, veuillez recommencer.")
    }
})

router.delete('/staff/:id', auth, async (req, res) => {
    const staff = Staff.findById({ _id: req.id })
    if (!staff) {
        return res.statut(404).send("Le staff n'existe pas")
    }
    try {
        staff.enabled = !staff.enabled  // j'active ou desactive le staff
        await staff.save()
        res.status(201).send(staff)

    } catch (error) {
        res.status(500).send("Une erreur est survenue lors de la modification veuillez réessayer.")
    }

})

router.post('/staff/login', async (req, res) => {
    try {
        const staff = await Staff.findByCredentials(req.body.login, req.body.password);
        const token = await staff.generateToken()
        return res.status(201).send({ staff, token })
    } catch (e) {
        res.status(404).send('login ou mot de passe erroné')
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
        let staff = await Staff.findById({ _id: req.params.id })
        if (!staff) {
            staff = await Admin.findById({ _id: req.params.id })
        } else if (!staff) {
            return res.status(404).send('staff inexistant')
        }
        res.status(200).send(staff)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.get('/staffs/:id', auth, async (req, res) => {  // get one staff
    try {
        let staffs = await Staff.find({ companyId: req.params.id })
        if (!staffs) {
            return res.status(404).send('staff inexistant')
        }
        res.status(200).send(staffs)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.get('/staff', auth, async (req, res) => {  // get All staff
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
router.get('/staff/branch/:id', auth, async (req, res) => {  // get All staff from a branch
    try {
        if (req.params.id !== 'undefined') {
            const staffs = await Staff.find({branchId: req.params.id})
            if (!staffs) {
                return res.status(404).send('Pas de staffs')
            }
            res.status(200).send(staffs)
        }

    } catch (error) {
        res.status(500).send('Problem de serveur')
    }
})

///////////////////////////////////


router.post('/staff/login', async (req, res) => {
    try {
        const staff = await Staff.findByCredentials(req.body.login, req.body.password);
        const token = await Staff.generateToken()
        return res.send({ staff, token })
    } catch (e) {
        res.status(404).send('login ou mot de passe erroné')
    }
})
router.post('/staff/logout', auth, async (req, res) => {
    try {
        req.staff.tokens = await req.staff.tokens.filter((token) => { return token.token !== req.token })
        await req.staff.save()
        res.send()
    } catch (error) {
        res.status(404).send(error)

    }
})

module.exports = router