const mongoose = require('mongoose')
const staffTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    description: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    Codefunction: {
        type: Number,
        required: [true, 'Why no values? Always provide values!'],
    },
    level: {
        type: Number,
        required: true
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
{timestamps: true})


const StaffType = mongoose.model('StaffTypes', staffTypeSchema)

module.exports = StaffType