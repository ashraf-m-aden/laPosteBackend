const mongoose = require('mongoose')
const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    },
    enabled: {
        type: Boolean,
        default: true
    }
})


const Role = mongoose.model('roles', roleSchema)

module.exports = Role