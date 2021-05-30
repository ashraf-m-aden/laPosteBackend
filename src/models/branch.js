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
    devises: [{
        deviseID:{
            type: mongoose.Schema.Types.ObjectId,
        },
        devise:{
            type: String
        }
    }],
    enabled: {
        type: Boolean,
        default: true
    }
},
{timestamps: true})


const Branch = mongoose.model('branch', branchSchema)

module.exports = Branch