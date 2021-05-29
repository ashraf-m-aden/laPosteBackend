const mongoose = require('mongoose')
const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Why no values? Always provide values!'],
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Why no values? Always provide values!'],
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
{timestamps: true})


const Branch = mongoose.model('branch', branchSchema)

module.exports = Branch