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
    clientType: {
        type: String,
        //required: true
    },
    idBoite: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true
    },
    idClient: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true
    },
    boiteType: {
        type: String,
        //required: true
    },
    idBoiteType: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true
    },
    status: {
        type: String,
        //required: true
    },
    bg: {
        type: String,
        //required: true
    },
    idStatus: {
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
    },
    NA: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true })


const clientBoite = mongoose.model('clientBoites', clientBoiteSchema)

module.exports = clientBoite