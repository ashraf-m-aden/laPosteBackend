const mongoose = require("mongoose");
const historicOperationchema = new mongoose.Schema(
    {
        idClient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        clientName: {
            type: String,
            required: true,
        },
        operations: [
            {
                idOperation: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
            },
        ],

        idBoite: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        boiteNumber: {
            type: Number,
            required: true,
        },

        idStaff: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        staffName: {
            type: String,
        },
        total: {
            type: Number,
        },
        enabled: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const HO = mongoose.model("historicoperations", historicOperationchema);

module.exports = HO;
