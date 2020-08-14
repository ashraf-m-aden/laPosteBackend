const mongoose = require('mongoose')
const historicOperationchema = new mongoose.Schema({

    idClient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    idOperation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    idBoite: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    boiteNumber: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    nameOperation: {
        type: String,
        required: true
    },
    idStaff: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    staffName: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true })


const HO = mongoose.model('historicoperations', historicOperationchema)

module.exports = HO