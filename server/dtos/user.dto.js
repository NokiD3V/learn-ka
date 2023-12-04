// userDto - стандартизация данных, филтрация их. Из всего списка данных мы получаем только нужные нам в этот момент данные
module.exports = class UserDto{
    id;
    email;
    admin;
    balance;

    constructor(module){
        this.email = module.email
        this.id = module.id
        this.admin = module.admin
        this.balance = module.balance
    }
}