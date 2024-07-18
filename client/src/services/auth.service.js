import $api from '../http/index'

export default class AuthService{
    async login(email, password){
        return $api.post('/users/login', {email, password})
    }

    async registration (data){
        return $api.post('/users/register', {email:data.email, password: data.password, name: data.name, surname: data.surname})
    }

    async logout(){
        return $api.post('/users/logout')
    }
}