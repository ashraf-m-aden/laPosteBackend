const mongoose = require('mongoose')
const serviceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    percentage: {
        type: Number,
    },
    ranges: [{
        max: {
            type: Number,
        },
        min: {
            type: Number,
        },
        amount: {
            type: Number,
        },
    }],
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    deviseId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    devise: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true })


const Service = mongoose.model('service', serviceSchema)

module.exports = Service