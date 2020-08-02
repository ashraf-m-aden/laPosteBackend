const mongoose = require('mongoose')
const impayesSchema = new mongoose.Schema({
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

const IMPAYES = mongoose.model('impayes', impayesSchema)

module.exports = IMPAYES