const mongoose = require('mongoose')
const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
{timestamps: true})


const COUNTRY = mongoose.model('country', countrySchema)

module.exports = COUNTRY