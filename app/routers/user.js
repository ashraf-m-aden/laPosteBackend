const express = require("express")
const router = new express.Router()
const User = require("../models/user")
const auth = require('../middleware/auth')

router.post('/user', auth, async (req, res) => { // nouvel utilisateur
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})



router.patch('/user/:id', auth, async (req, res) => {  // modifier un utilisateur
    const user = User.findById({ _id: req.id })
    if (!user) {
        return res.statut(404).send("L'utilisateur n'existe pas")
    }
    try {
        user.name = req.body.name
        user.login = req.body.login
        user.password = req.body.password
        user.role = req.body.role
        user.enabled = req.body.enabled
        await user.save()
        return res.send(user)
    } catch (error) {
        res.status(500).send("Une erreur est survenue, veuillez recommencer.")
    }
})
router.patch('/user/mdp/:id', auth, async (req, res) => {  // modifier le mot de passe d'un utilisateur
    const user = User.findById({ _id: req.id })
    if (!user) {
        return res.statut(404).send("L'utilisateur n'existe pas")
    }
    try {
        user.password = req.body.password
        await user.save()
        return res.send(user)
    } catch (error) {
        res.status(500).send("Une erreur est survenue, veuillez recommencer.")
    }
})

router.delete('/user/:id', auth, async (req, res) => {  // desactiver un utilisateur
    const user = User.findById({ _id: req.id })
    if (!user) {
        return res.statut(404).send("L'utilisateur n'existe pas")
    }
    try {
        user.enabled = !user.enabled  // j'active ou desactive L'utilisateur
        await user.save()
        res.status(200).send(user)

    } catch (error) {
        res.status(500).send("Une erreur est survenue lors de la modification veuillez réessayer.")
    }

})

router.post('/user/login', async (req, res) => { // login
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateToken()
        return res.status(201).send({ user, token })
    } catch (e) {
        res.status(404).send('login ou mot de passe erroné')
    }
})
router.get('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => { return token.token !== req.token })
        await req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(404).send(error)

    }
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/user/:id', auth, async (req, res) => {  // get one user
    try {
        let user = await User.findById({ _id: req.params.id })
        if (!user) {
           
            return res.status(404).send('patient inexistant')
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.get('/users/:id', auth, async (req, res) => {  // get all user
    try {
        let users = await User.find({ companyId: req.params.id })
        if (!users) {
            return res.status(404).send('user inexistant')
        }
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send('Un problem est survenu veuillez reessayer')
    }
})
router.get('/users', auth, async (req, res) => {  // get All user
    try {
        const users = await User.find({})
        if (!users) {
            return res.status(404).send('Pas de users')
        }
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send('Problem de serveur')
    }
})
router.get('/user/branch/:id', auth, async (req, res) => {  // get All user from a branch
    try {
        if (req.params.id !== 'undefined') {
            const users = await User.find({branchId: req.params.id})
            if (!users) {
                return res.status(404).send('Pas de users')
            }
            res.status(200).send(users)
        }

    } catch (error) {
        res.status(500).send('Problem de serveur')
    }
})

///////////////////////////////////


router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.login, req.body.password);
        const token = await user.generateToken()
        return res.send({ user, token })
    } catch (e) {
        res.status(404).send('login ou mot de passe erroné')
    }
})
router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = await req.user.tokens.filter((token) => { return token.token !== req.token })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(404).send(error)

    }
})

module.exports = router