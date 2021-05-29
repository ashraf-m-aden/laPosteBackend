const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    sender: {
        type: String, required: true

    },
    senderId: {
        type: String,
        required: true
    },
    senderNumber: {
        type: String, required: true

    },
    receiver: {
        type: String, required: true

    },
    receiverId: {
        type: String, required: true

    },
    receiverNumber: {
        type: String,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fromCountryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toCountryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    address: {
        type: String,
    },
    amount: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true

    },
    total: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiptUrl: {
        type: String,
    },
    originalTransactionId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    enabled: {
        type: Boolean,
        default: true
    }

},
    { timestamps: true })

const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction