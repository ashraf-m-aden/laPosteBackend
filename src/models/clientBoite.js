const mongoose = require('mongoose')
const clientBoiteSchema = new mongoose.Schema({
    boiteNumber: {
        type: String,
        //required: [true, 'Why no values? Always provide values!'],
    },
    clientName: {
        type: String,
        //required: [true, 'Why no values? Always provide values!'],
    },
    idBoite: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true
    },
    idClient: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true
    },
    enabled: {
        type: Boolean,
        default: true
    },
    startDate: {
        type: Number,
        //required: true
    },
    releaseDate: {
        type: Date,
        //required: true
    }
},
{timestamps: true})


const clientBoite = mongoose.model('clientBoites', clientBoiteSchema)

module.exports = clientBoite