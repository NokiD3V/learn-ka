import $api from '../http/index'

export default class AuthService{
    async login(email, password){
        return $api.post('/users/login', {email, password})
    }

    async registration (email, password){
        return $api.post('/users/registration', {email, password})
    }

    async logout(){
        return $api.post('/users/logout')
    }
}