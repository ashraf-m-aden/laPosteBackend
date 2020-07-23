const mongoose = require('mongoose')
const forfaitSchema = new mongoose.Schema({
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
{timestamps: true})


const Forfait = mongoose.model('Forfait', forfaitSchema)

module.exports = Forfait