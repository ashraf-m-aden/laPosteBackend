const mongoose = require('mongoose')
const boiteSchema = new mongoose.Schema({

    idClient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    idForfait: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
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
{timestamps: true})


const Boite = mongoose.model('Boite', boiteSchema)

module.exports = Boite