const mongoose = require('mongoose')
const actualSchema = new mongoose.Schema({

    clientName: {
        type: String,
    },
    Type: {
        type: String,
    },
    NBP: {
        type: String,
    },
    Cat: {
        type: String,
    },
    Rdv: {
        type: String,
    },
    DOMICILE: {
        type: String,
    },
    TEL: {
        type: String,
    },
    SC: {
        type: String,
    }
  
},
    { timestamps: true })

const ACTUAL = mongoose.model('actuals', actualSchema)

module.exports = ACTUAL