const jwt = require('jsonwebtoken')

class TokenService {
    async generateToken(payload){
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'7d'})
        return token;
    }

    async validateToken(token){
        try {
            // Проверка токена на его валидность
            const userData = await jwt.verify(token, process.env.JWT_SECRET)
            return userData;
        } catch (error) {
            throw error
        }
    }
}

module.exports = new TokenService();