const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // required: true,
        trim: true,
        lowerCase: true,
        unique: true, // le faire au tout debut sinn il faudra supprimer toute la base pour que cela fonctionne
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('L\'email est invalide')
            }
        }
    },

    enabled: {
        type: Boolean,
        default: true
    },
    idClientType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    idBoite: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    boiteNumber: {
        type: String,
        required: true
    },
    clientType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true

    },
    bg: {
        type: String,
        required: true

    },
    idStatus: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },


},
    { timestamps: true })

// verify credentials, this a function we use on client and not on client
clientSchema.statics.findByCredentials = async (email, password) => {
    const client = await client.findOne({ email })
    if (!client) {
        throw new Error('Connexion refusée')
    }
    const isMatch = await bcrypt.compare(password, client.password)
    if (!isMatch) {
        throw new Error('Connexion refusée')
    }
    return client
}

clientSchema.statics.isAdmin = async (email, password) => {
    const client = await client.findOne({ email })
    if (!client) {
        throw new Error('Connexion refusée')
    }
    const isMatch = await bcrypt.compare(password, client.password)
    if (!isMatch) {
        throw new Error('Connexion refusée')
    }
    if (!client.isAdmin) {
        throw new Error('Connexion refusée')
    }
    return client
}


clientSchema.methods.generateToken = async function () {
    const client = this
    try {
        const token = jwt.sign({ _id: client._id.toString() }, 'laIlaahaIlaAllah')
        while (client.tokens.length > 1) {
            client.tokens.shift()
        }

        client.tokens = client.tokens.concat({ token })
        await client.save()
        return token
    } catch (e) {
        throw new Error('Probleme de creation d\'utilisateur')
    }
}

clientSchema.methods.toJSON = function () {
    const client = this
    const clientObject = client.toObject()
    delete clientObject.password
    delete clientObject.tokens
    return clientObject
}
// hash the plain text password
clientSchema.pre('save', async function (next) {
    const client = this;
    if (client.isModified('password')) {
        client.password = await bcrypt.hash(client.password, 8)
    }
    next()
});
const Client = mongoose.model('Client', clientSchema)

module.exports = Client