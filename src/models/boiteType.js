const mongoose = require('mongoose')
const boiteTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    description: {
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


const BoiteType = mongoose.model('boitetypes', boiteTypeSchema)

module.exports = BoiteType