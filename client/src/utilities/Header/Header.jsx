import React, { useContext, useEffect } from 'react';
import style from './style/header.module.scss'
import logo from './assets/logo.svg'
import profile from './assets/profile.svg'
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import Loader from '../Loader/Loader';
/**
 * @description Header for pages
 */

const Header = () => {
    const {store} = useContext(Context)
    console.log(store.isAuth)
    
    useEffect(() => {
        if(store.headerAuth == true){
            if(localStorage.getItem('token')){
                store.checkAuth()
            }
        }
    }, [])

    useEffect(() => {
        console.log(store.user)
    }, store.isAuth)
    
    if(store.headerAuth == true & store.isLoading){
        return <Loader/>
    }


    return (
        <div className={style.header__wrapper}>
            <header>
                <a href='/'><img src={logo} alt="Logo" className="logo"/></a>
                {store.isAuth ? 
                (<ul className={style.nav}>
                    <ul className={style.nav__item}><a href='/games'>Играть</a></ul>
                    <ul className={style.nav__item}><a href='/leaders'>Рейтинг</a></ul>
                    <ul className={style.nav__item}><a href='https://vk.com/nokoko12'>О нас</a></ul> 
                </ul>)
                : (<ul className={style.nav}>
                    <ul className={style.nav__item}><a href='/'>Главная</a></ul>
                    <ul className={style.nav__item}><a href='https://vk.com/nokoko12'>О нас</a></ul>
                    <ul className={style.nav__item}><a href='https://vk.com/nokoko12'>Контакты</a></ul>
                </ul>)
                }
                <div className={style.profile}><a href="/profile">Профиль</a><img src={profile} alt="[P]" /></div>
            </header>  
            { store.localErros.length > 0 && store.localErros?.[0] != undefined ?       
                store.localErros.map(n => {
                    return (
                        <div className={style.errors} >
                            <ul>
                                <li onClick={() => {
                            store.setErrors([])
                        }}>{n}</li>
                            </ul>
                        </div>
                    )
                })
                : null
            }
        </div>

    );
}

export default observer(Header);