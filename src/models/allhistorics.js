const mongoose = require('mongoose')
const all_historicSchema = new mongoose.Schema({

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

const ALLH = mongoose.model('all_historics', all_historicSchema)

module.exports = ALLH