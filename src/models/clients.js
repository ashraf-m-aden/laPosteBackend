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
    Nbp: {
        type: String,
    }
  
},
    { timestamps: true })

const BGP = mongoose.model('bgpdatas', clientSchema)

module.exports = BGP