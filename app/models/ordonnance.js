const mongoose = require('mongoose')
const ordonnanceSchema = new mongoose.Schema({
    consultationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    medicaments: [{
        medicament: {
            type: String,
            required: true
        },
        unite: {
            type: String,
            required: true
        },
        frequence: {
            type: String,
            required: true
        },
        jours: {
            type: String,
            required: true
        }
    }],
    enabled: {
        type: Boolean,
        default: true
    }
},
{timestamps: true})


const ordonnance = mongoose.model('ordonnances', ordonnanceSchema)

module.exports = ordonnance