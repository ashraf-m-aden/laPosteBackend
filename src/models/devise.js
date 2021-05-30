const mongoose = require('mongoose')
const deviseSchema = new mongoose.Schema({
    devise: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
{timestamps: true})


const Devise = mongoose.model('devise', deviseSchema)

module.exports = Devise