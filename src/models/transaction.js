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
        type: String
    },
    receiverNumber: {
        type: String,
    },
    companyId: {
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
    devise: {
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
    modifyingStaffId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sendingreceiptUrl: {
        type: String,
    },
    staffName: {
        type: String,
    },
    receivingreceiptUrl: {
        type: String,
    },
    sendingBranch: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receivingBranch: {
        type: mongoose.Schema.Types.ObjectId,
    },
    originalTransactionId: {
        type: String,
    },
    time:{
        type: String,
        required: true

    },
    enabled: {
        type: Boolean,
        default: true
    }

},
    { timestamps: true })

const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction