const mongoose = require('mongoose')
const clientTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    description: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    idBoitetypes: [{
        idBoiteType: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }],
    forfaits: [{
        idForfait: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
        }
    }],
    enabled: {
        type: Boolean,
        default: true
    }
},
{timestamps: true})


const ClientType = mongoose.model('ClientType', clientTypeSchema)

module.exports = ClientType