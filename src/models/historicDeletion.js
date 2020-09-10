const mongoose = require("mongoose");
const historicDeleteSchema = new mongoose.Schema(
  {
    idClient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },

    global_idOperation: {
      type: mongoose.Schema.Types.ObjectId,
    },
    idOperation: {
        type: mongoose.Schema.Types.ObjectId,
      },
    price: {
      type: Number,
    },
    name: {
      type: String,
    },

    idPayment: {
      type: mongoose.Schema.Types.ObjectId,
    },
    comments: {
      type: String,
    },
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
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const HD = mongoose.model(" historicDeletes", historicDeleteSchema);

module.exports = HD;
