const mongoose = require('mongoose')
const clientStatusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    description: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true })


const ClientStatus = mongoose.model('clientStatus', clientStatusSchema)

module.exports = ClientStatus