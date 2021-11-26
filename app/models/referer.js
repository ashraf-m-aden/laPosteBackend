const mongoose = require('mongoose')
const refererSchema = new mongoose.Schema({
    consultationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
    },
    enabled: {
        type: Boolean,
        default: true
    }

},
{timestamps: true})


const referer = mongoose.model('referers', refererSchema)

module.exports = referer