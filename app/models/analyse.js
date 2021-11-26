const mongoose = require('mongoose')
const analyseSchema = new mongoose.Schema({
    consultationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    analyses: [{
        analyse: {
            type: String,
            required: true
        }
    }],
    typeI: {
        type: String,
    },
    typeII: {
        type: String,
    },
    typeIII: {
        type: String,
    },
    typeIV: {
        type: String,
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
{timestamps: true})


const analyse = mongoose.model('analyses', analyseSchema)

module.exports = analyse