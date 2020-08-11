const mongoose = require('mongoose')
const boiteSchema = new mongoose.Schema({
    number: {
        type: String,
        //required: [true, 'Why no values? Always provide values!'],
    },
    boiteType: {
        type: String,
        //required: [true, 'Why no values? Always provide values!'],
    },
    idBoiteType: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true
    },
    price: {
        type: Number,
        //required: [true, 'Why no values? Always provide values!'],
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true })


const EXBOITES = mongoose.model('exboites', boiteSchema)

module.exports = EXBOITES