const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    matricule: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    gendarme: {
        type: Boolean,
        required: true
    },
    dossier: {
        type: String,
    },

    numero: {
        type: String,
    },
    addresse: {
        type: String,
    },
    email: {
        type: String,
    },
    bloodType: {
        type: String,
    },
    enabled: {
        type: Boolean,
        default: true
    },

},
    { timestamps: true })


patientSchema.methods.toJSON = function () {
    const patient = this
    const patientObject = patient.toObject()
    delete patientObject.password
    delete patientObject.tokens
    return patientObject
}


const patient = mongoose.model('patients', patientSchema)

module.exports = patient