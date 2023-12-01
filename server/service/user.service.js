const db = require('../models/index')
const Users = db.users;

class UserService {
    async test(){
        Users.create({email:"test@gmail.com", password:"123"})
    }
}

module.exports = new UserService();