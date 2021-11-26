const mongoose = require('mongoose')
const resultatSchema = new mongoose.Schema({
    consultationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    analyseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    resultats: [{
        url: {
            type: String,
        }
      
    }],
    enabled: {
        type: Boolean,
        default: true
    }
},
{timestamps: true})


const resultat = mongoose.model('resultats', resultatSchema)

module.exports = resultat