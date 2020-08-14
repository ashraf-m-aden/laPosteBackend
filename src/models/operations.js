const mongoose = require('mongoose')
const operationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    price: {
        type: Number,
        required: [true, 'Why no values? Always provide values!'],
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true })


const OPERATION = mongoose.model('operations', operationSchema)

module.exports = OPERATION