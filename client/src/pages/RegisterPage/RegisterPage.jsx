import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react-lite'
import Header from '../../utilities/Header/Header';
import style from './style/register.module.scss'
import image from './assets/image1.png'
import Loader from '../../utilities/Loader/Loader';
import { useForm } from 'react-hook-form';


const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    

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

    if(store.isAuth){
        console.log(store.isAuth)
        window.location.href = "/profile"
        return
    }
    
    return (
        <div> 
            <Header/>
            <div className={style.wrapper}>
                <div className={style.content}>
                    <form className={style.form} onSubmit={handleSubmit((data) => {
                        if(data.password.length < 6) return store.setErrors(["Пароль слишком короткий"])
                        if(data.password != data.passwordrepeat) return store.setErrors(["Пароли не совпадают"])
                        
                        store.registration(data)
                    })}>
                        <div className={style.title}>Регистрация</div>
                        <div className={style.form__child}>
                            <span>Имя</span>
                            <input type="text" name="name" placeholder='Никитка' {...register('name', { required: true })} />
                        </div>
                        <div className={style.form__child}>
                            <span>Фамилия</span>
                            <input type="text" name="surname" placeholder='Покумин' {...register('surname', { required: true })}/>
                        </div>
                        <div className={style.form__child}>
                            <span>Email</span>
                            <input type="email" name="email" placeholder='email@example.org' {...register('email', { required: true })}/>
                        </div>
                        <div className={style.form__child}>
                            <span>Пароль</span>
                            <input type="password" name="password" placeholder='ОченьСложныйПароль' {...register('password', { required: true })}/>
                        </div>
                        <div className={style.form__child}>
                            <span>Повторите пароль</span>
                            <input type="password" name="passwordrepeat" placeholder='ОченьСложныйПароль2' {...register('passwordrepeat', { required: true })}/>
                        </div>
                        <a href="/login" className={style.link}>Есть аккаунт? Войдите!</a>
                        <button type="submit" className={style.login__btn} href='#'>Создать</button>
                    </form>
                    <div className={style.picture}><img src={image} alt="Регистрация" /></div>
                </div>
            </div>
        </div>
            
    );
}

export default observer(RegisterPage);
