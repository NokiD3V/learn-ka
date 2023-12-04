const jwt = require('jsonwebtoken')

class TokenService {
    async generateToken(payload){
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'7d'})
        console.log("TOKEN", token)
        return token;
    }
}

module.exports = new TokenService();