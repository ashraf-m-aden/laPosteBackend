const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    login: {
        type: String,
        unique: true, // le faire au tout debut sinn il faudra supprimer toute la base pour que cela fonctionne
        required: true
    },

    enabled: {
        type: Boolean,
        default: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

},
    { timestamps: true })


adminSchema.methods.toJSON = function () {
    const admin = this
    const adminObject = admin.toObject()
    delete adminObject.password
    delete adminObject.tokens
    return adminObject
}
adminSchema.methods.generateToken = async function () {
    const staff = this
    try {
        const token = await jwt.sign({ _id: staff._id.toString() }, process.env.jwt_secret)
        while (staff.tokens.length >= 1) {
            await staff.tokens.shift()
        }
        staff.tokens = await staff.tokens.concat({ token })
        await staff.save()
        return token
    } catch (e) {
        throw new Error('Probleme de creation d\'utilisateur')
    }
}
// hash the plain text password
adminSchema.pre('save', async function (next) {
    const admin = this;
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
});
const admin = mongoose.model('admins', adminSchema)

module.exports = admin