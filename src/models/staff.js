const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('./admin')
const staffSchema = new mongoose.Schema({
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
        unique: [true, 'Ce login est deja prit'], // le faire au tout debut sinn il faudra supprimer toute la base pour que cela fonctionne
        required: true,

    },
    position: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: true
    },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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

// verify credentials, this a function we use on Staff and not on staff
staffSchema.statics.findByCredentials = async (login, password) => {
    let staff = await Staff.findOne({ login })
    if (!staff) {
        staff = await Admin.findOne({ login })
        if(!staff) {
            throw new Error('Connexion refusée')
        }
    } 
    const isMatch = await bcrypt.compare(password, staff.password)
    if (!isMatch) {
        throw new Error('Connexion refusée')
    }
    return staff
}

staffSchema.statics.isAdmin = async (login, password) => {
    const staff = await Staff.findOne({ login })
    if (!staff) {
        throw new Error('Connexion refusée')
    }
    const isMatch = await bcrypt.compare(password, staff.password)
    if (!isMatch) {
        throw new Error('Connexion refusée')
    }
    if (!staff.isAdmin) {
        throw new Error('Connexion refusée')
    }
    return staff
}


staffSchema.methods.generateToken = async function () {
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

staffSchema.methods.drole = async function () {
    return "drole"
}
staffSchema.methods.toJSON = function () {
    const staff = this
    const staffObject = staff.toObject()
    delete staffObject.password
    delete staffObject.tokens
    return staffObject
}
// hash the plain text password
staffSchema.pre('save', async function (next) {
    const staff = this;
    if (staff.isModified('password')) {
        staff.password = await bcrypt.hash(staff.password, 8)
    }
    next()
});
const Staff = mongoose.model('Staffs', staffSchema)

module.exports = Staff