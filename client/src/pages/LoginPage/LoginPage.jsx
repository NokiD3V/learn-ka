import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react-lite'
import Header from '../../utilities/Header/Header';
import style from './style/loginpage.module.scss'
import image from './assets/image1.png'
import Loader from '../../utilities/Loader/Loader';


const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)
    const navigate = useNavigate()
    store.headerAuth = false

    useEffect(() => {
        if(localStorage.getItem('token')){
            store.checkAuth()
        }
    }, [])

    useEffect(() => {
        if(store.isAuth && !store.isLoading){
            console.log(store.isAuth)
            navigate("/profile", {replace: true})
            return
        }
    }, [store.isAuth])
    
    if(store.isLoading){
        return <Loader/>
    }

    return (
        <div> 
            <Header/>
            <div className={style.wrapper}>
                <div className={style.content}>
                    <div className={style.form}>
                        <div className={style.title}>Aвторизация</div>
                        <div className={style.email}>
                            <span>Email</span>
                            <input type="email" name="email" placeholder='email@example.org' onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className={style.password}>
                            <span>Пароль</span>
                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='ОченьСложныйПароль'/>
                        </div>
                        <a className={style.login__btn} href='#' onClick={() => store.login(email, password)}>Войти</a>
                    </div>
                    <div className={style.picture}><img src={image} alt="Авторизация" /></div>
                </div>
            </div>
        </div>
            
    );
}

export default observer(LoginPage);
