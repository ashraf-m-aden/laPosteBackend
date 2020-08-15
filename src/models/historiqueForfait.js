const mongoose = require('mongoose')
const hfSchema = new mongoose.Schema({

    idClient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    forfaits: [{
        idForfait: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }],
    idBoite: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    idStaff: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true })


const HF = mongoose.model('historiqueforfaits', hfSchema)

module.exports = HF