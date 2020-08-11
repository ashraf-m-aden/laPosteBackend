const mongoose = require('mongoose')
const clientSchema = new mongoose.Schema({
    nNabnt: {
        type: String,
    },
    Nomcl: {
        type: String,
    },
    Type_Client: {
        type: String,
    },
    Code_Cat: {
        type: String,
    },
    Etat: {
        type: String,
    },
    DateEvt: {
        type: String,
    },
    R: {
        type: String,
    },
    d: {
        type: String,
    },
    S: {
        type: String,
    },
    phonecl: {
        type: String,
    },
    number: {
        type: String,
    }

},
    { timestamps: true })

const GB = mongoose.model('pboites', clientSchema)

module.exports = GB