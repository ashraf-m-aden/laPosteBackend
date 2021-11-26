const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const consultationSchema = new mongoose.Schema({

    type: {
        type: String,
        required: true
    },
    isGN: {
        type: Boolean,
        required: true
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
    },
    doctor: {
        type: String,
        required: true
    },
    idPatient: {
        type: mongoose.Schema.Types.ObjectId,
    },
    patient: {
        type: String,
        required: true
    },
    motif: {
        type: String,
    },

    antecedents: {
        type: String,
    },
    examen: {
        type: String,
    },
    hypotheses: {
        type: String,
    },
    evalutation: {
        type: String,
    },
    referer: {
        type: Boolean,
    },
    refererContent: {
        type: String,
    },
    referer: {
        type: Boolean,
    },
    refererId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    ordonnance: {
        type: Boolean,
    },
    ordonnanceId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    analyse: {
        type: Boolean,
    },
    analyseId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    resultat: {
        type: Boolean,
    },
    resultatId: {
        type: mongoose.Schema.Types.ObjectId,
    },      
    enabled: {
        type: Boolean,
        default: true
    },

},
    { timestamps: true })


consultationSchema.methods.toJSON = function () {
    const consultation = this
    const consultationObject = consultation.toObject()
    delete consultationObject.password
    delete consultationObject.tokens
    return consultationObject
}


const Consultation = mongoose.model('consultations', consultationSchema)

module.exports = Consultation