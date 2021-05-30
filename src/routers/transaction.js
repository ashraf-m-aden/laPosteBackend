const express = require("express")
const router = new express.Router()
const Staff = require("../models/staff")
const Transaction = require("../models/transaction")
const Country = require('../models/country')
const auth = require('../middleware/auth')

router.post('/transaction', auth, async (req, res) => { //enregistrer une transaction

    try {
        const transaction = new Transaction(req.body)

        await transaction.save()
        return res.status(201).send(transaction)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.post('/transaction/send/time/:id', auth, async (req, res) => { //recuperer les transactions d'une journee pour une branche

    try {
        const time = req.body
        const transactions = await Transaction.find({ sendingBranch: req.params.id, time:req.body.time, enabled: true })
        if (!transactions) {
            res.status(200).send({ transactions: [] })
        }
        res.status(200).send(transactions)

    } catch (error) {
        return res.status(404).send(error)
    }
})
router.post('/transaction/receive/time/:id', auth, async (req, res) => { //recuperer les transactions d'une journee pour une branche

    try {
        const time = req.body
        const transactions = await Transaction.find({ toCountryId: req.params.id, time:req.body.time, enabled: true })
        if (!transactions) {
            res.status(200).send({ transactions: [] })
        }
        res.status(200).send(transactions)

    } catch (error) {
        return res.status(404).send(error)
    }
})

router.delete('/transaction/:id', auth, async (req, res) => { //supprimer une transaction

    try {
        const transaction = await Transaction.findById({_id:req.params.id})
        transaction.enabled = false;
        await transaction.save()
        return res.status(201).send(transaction)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/transaction/client/:id', auth, async (req, res) => { //recuperer les transactions d'un client

    try {
        const transactions = await Transaction.find({ senderId: req.params.id, enabled: true })
        if (!transactions) {
            res.status(200).send({ transactions: [] })
        }
        res.status(200).send(transactions)

    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/transaction/:id', auth, async (req, res) => { // recuperer une tra
    try {
        const transaction = await Transaction.findById({ _id: req.params.id, enabled: true })
        if (!transaction) {
            res.status(200).send({ transaction: [] })
        }
        res.status(200).send(transaction)

    } catch (error) {
        return res.status(404).send(error)
    }
})
router.get('/transaction/transfert/:id', auth, async (req, res) => { // recuperer une transaction

    try {
        const transaction = await Transaction.findById({ branchId: req.params.id, enabled: true })
        if (!transaction) {
            res.status(200).send({ transaction: [] })
        }
        res.status(200).send(transaction)

    } catch (error) {
        return res.status(404).send(error)
    }
})
router.patch('/transaction/:id', auth, async (req, res) => { // recuperer une transaction

    try {
        const originalTransactionId = req.params.id
        const transaction = await Transaction.findById({ _id: originalTransactionId, enabled: true })
        if (!transaction) {
            res.status(200).send({ transaction: [] })
        }
        transaction.enabled = false
        await transaction.save()
        const newTransaction = new Transaction(req.body)
        newTransaction.originalTransactionId = originalTransactionId
        await newTransaction.save()
        res.status(200).send()

    } catch (error) {
        return res.status(404).send(error)
    }
})
router.patch('/transaction/received/:id', auth, async (req, res) => { // recuperer une transaction

    try {
        const transaction = await Transaction.findById({ _id: req.params.id, enabled: true })
        const receiverData = req.body
        if (!transaction) {
            res.status(200).send({ transaction: [] })
        }
        transaction.status = "Delivrée"
        transaction.receiverId = receiverData.receiverId
        transaction.receiverNumber = receiverData.receiverNumber
        await transaction.save()
        const newTransaction = new Transaction(req.body)
        newTransaction.originalTransactionId = originalTransactionId
        await newTransaction.save()
        res.status(200).send()

    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/transactions', auth, async (req, res) => { // recuperer tout les transactions

    try {
        const transactions = await Transaction.find({enabled: true})
        if (!transactions) {
            res.status(200).send({ transactions: [] })
        }
        res.status(200).send(transactions)

    } catch (error) {
        return res.status(404).send(error)
    }
})


module.exports = router