const mongoose = require('mongoose')
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why no values? Always provide values!'],
    }, countries:[
        {
            countryId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            }
        }
    ],

    enabled: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true })


const Company = mongoose.model('company', companySchema)

module.exports = Company