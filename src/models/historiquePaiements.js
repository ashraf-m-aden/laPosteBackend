const mongoose = require('mongoose')
const historicPSchema = new mongoose.Schema({
    boiteNumber: {
        type: String,
        //required: [true, 'Why no values? Always provide values!'],
    },
    idBoite: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true
    },
    priceBoite: {
        type: Number
    },
    idClient: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true
    },
    idPaiement: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true
    },
    forfaits: [{
        idForfait: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        name: {
            type: String
        }
    }],
    tax: {
        type: Boolean,
        default: false
    },
    penalite: {
        type: Number,
        default: 0
    },
    payment_type: {
        type: String,
        default: "Espèces"
    },
    payment_number: {
        type: String
    },
    idStaff: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    enabled: {
        type: Boolean,
        default: true
    },
    date: {
        type: String,
        //required: true
    },
    total: {
        type: Number,
        //required: true
    },
    total_redevance: {
        type: Number,
        //required: true
    },

},
    { timestamps: true })


const HistoricP = mongoose.model('historicPs', historicPSchema)

module.exports = HistoricP