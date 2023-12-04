const db = require('../models/index')
const Users = db.users;

const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user.dto');
const ApiError = require('../exceptions/api-error');
const tokenService = require('./token.service');

class UserService {
    async register(email, password){
        const candidate = await Users.findOne({
            where:{email}
        })
        if(candidate){
            throw ApiError.BadRequest(`Пользователь с адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        let user = await Users.create({email, password: hashPassword})
        user = user.dataValues // Берём данные после создания пользователя в базу данных

        // userDto - стандартизация данных, филтрация их. Из всего списка данных мы получаем только нужные нам в этот момент данные
        const userDto = new UserDto(user)
        const token = await tokenService.generateToken({...userDto})

        return {
            token,
            user: userDto
        }    
    }
}

module.exports = new UserService();