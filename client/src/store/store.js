import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_URL } from "../http";
import http from '../http'
import AuthService from "../services/auth.service";

export default class Store{

    //
    // Auth Store 
    //
    user = {};
    isAuth = false;
    isLoading = false;
    localErros = [];
    headerAuth = true;

    constructor(){
        // Автоматическое обновление стора при изменении какой-либо части
        makeAutoObservable(this)
    }

    setAuth(bool){
        this.isAuth = bool;
    }

    setUser(user){
        this.user = user
    }

    setLoading(bool){
        this.isLoading = bool
    }

    async login(email, password){
        this.setLoading(true)
        try{
            const response = await new AuthService().login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            console.log(response)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e){
            console.log(e)
            console.log(e.response?.data?.message)
            this.setErrors([e.response?.data?.message])
        } finally{
            this.setLoading(false)
        }
    }

    async registration(email, password){
        try{ 
            const response = await new AuthService().registration (email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e){
            console.log(e)
            this.setErrors([e.response?.data?.message])
            console.log(e.response?.data?.message)
        } finally{
            this.setLoading(false)
        }
    }

    async logout(){
        try{
            const response = await new AuthService().logout();
            localStorage.removeItem('token');
            this.setAuth(false)
            this.setUser({})
        } catch(e){
            console.log(e.response?.data?.message)
            this.setErrors([e.response?.data?.message])
        } finally{
            this.setLoading(false)
        }
    }

    async checkAuth(){
        this.setLoading(true)
        try {
            const res = await axios.get(`${API_URL}/users/refresh`, {withCredentials:true})
            localStorage.setItem('token', res.data.accessToken);
            this.setAuth(true)
            this.setUser(res.data.user)
            console.log(res.data)
            
        } catch (e) {
            console.log(e)
            this.setErrors([e.response?.data?.message])
        }
        finally {
            this.setLoading(false)
        }
        
        console.log(this.isAuth)
    }

    async getTask(){
        try {
            const task = await http.get("/tasks/generatetask") 
            console.log(task)
            return task.data
            
        } catch (e) {
            console.log(e)
            this.setErrors([e.response?.data?.message])
        }
    }

    async sendTaskAnswer(taskID, answer){
        try {
            const task = await http.post("/tasks/answer", {taskID, answer}) 
            console.log(task)
            return task.data
            
        } catch (e) {
            console.log(e)
            this.setErrors([e.response?.data?.message])
        }
    }


    async getLeaderboard(){
        try {
            const users = await http.get("/users/leaders") 
            if(users.data.success) return users.data
        } catch (e) {
            console.log(e)
            this.setErrors([e.response?.data?.message])
        }
    }

    setErrors(errors){
        this.localErros = errors;
    }
}