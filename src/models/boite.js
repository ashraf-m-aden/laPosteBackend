const mongoose = require('mongoose')
const boiteSchema = new mongoose.Schema({
    number: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    idBoiteType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
{timestamps: true})


const Boite = mongoose.model('boites', boiteSchema)

module.exports = Boite