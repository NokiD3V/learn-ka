const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token.service");

module.exports = async (req, res, next) => {
    try {
        // Проверка токена на его валидность
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError());
        }

        let token = authorizationHeader.split(" ")
        if(token.length < 2) {
            return next(ApiError.BadRequest("Ошибка в процессе авторизации. Повторите попытку", []))
        }
        token = token[1]
        const userData = await tokenService.validateToken(token);
        if(!userData) {
            return next(ApiError.UnauthorizedError());
        }
        next()
    } catch (error) {
        console.log(error)
    }
}