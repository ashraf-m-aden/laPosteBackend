const mongoose = require('mongoose')
const payesSchema = new mongoose.Schema({
    Nbrs: {
        type: String,
    },
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

const PAYES = mongoose.model('payes', payesSchema)

module.exports = PAYES