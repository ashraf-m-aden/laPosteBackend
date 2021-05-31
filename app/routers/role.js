const express = require("express")
const router = new express.Router()
const Devise = require("../models/devise")
const Role = require("../models/role")
const Service = require("../models/typeService")


router.post('/role', async (req, res) => {
    
    try {
        const role = new Role(req.body)

        await role.save()
        return res.status(201).send(role)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/roles', async (req, res) => {
    
    try {
        const roles = await Role.find({})
        return res.status(201).send(roles)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/role', async (req, res) => {
    
    try {
        const result = await Role.find({})
        const roles = await result.filter((role)=>{
            return role.role !== 'Owner'
        })
        return res.status(201).send(roles)
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
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.post('/service', async (req, res) => {
    
    try {
        const service = new Service(req.body)

        await service.save()
        return res.status(201).send(service)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/service/branch/:id', async (req, res) => {
    
    try {
        const services = await Service.find({branchId: req.params.id})
        return res.status(201).send(services)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/service/modify', async (req, res) => {
    
    try {
        var service = await Service.findOne({branchId: req.body.branchId})
        const newService= req.body
        service.overwrite({ranges: newService.ranges, deviseId: newService.deviseId, devise: newService.devise,
            branchId: newService.branchId, type: newService.type, enabled: newService.enabled, percentage: newService.percentage})
        await service.save()
        return res.status(201).send(service)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/service', async (req, res) => {
    
    try {
        const result = await Service.find({})
        const services = await result.filter((service)=>{
            return service.service !== 'Owner'
        })
        return res.status(201).send(services)
    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/service/:id', async (req, res) => {  // get one service
    try {
        const service = await Service.findById({ _id: req.params.id })
        if (!service) {
            return res.status(404).send('service inexistant')
        }
        res.status(200).send(service)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})

router.post('/devise', async (req, res) => {
    
    try {
        const devise = new Devise(req.body)

        await devise.save()
        return res.status(201).send(devise)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/devise', async (req, res) => {
    
    try {
        const result = await Devise.find({})
        return res.status(201).send(result)
    } catch (error) {
        return res.status(404).send(error)
    }
})



module.exports = router