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
    isSuperviseur: {
        type: Boolean,
        default: false
    },
    hasPower: {
        type: Boolean,
        default: false
    },
    isAgent: {
        type: Boolean,
        default: false
    },
    isVisiteur: {
        type: Boolean,
        default: false
    },
    enabled: {
        type: Boolean,
        default: true
    }
},
{timestamps: true})


const StaffType = mongoose.model('StaffTypes', staffTypeSchema)

module.exports = StaffType