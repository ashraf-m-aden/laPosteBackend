const jwt = require('jsonwebtoken')
const Staff = require('../models/staff')
const auth = async (req, res, next) => {
    
    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, process.env.jwt_secret)        
        const staff = await Staff.findOne({ _id: decoded._id, 'tokens.token': token })     
        if (!staff) {
            throw new Error()
        }
        req.staff = staff
        req.token = token
        next()

    } catch (error) {
        res.status(401).send({ error: 'Veuillez vous connecter' })
    }


}

module.exports = auth