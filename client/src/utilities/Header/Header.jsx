import React, { useContext, useEffect, useState } from 'react';
import style from './style/header.module.scss'
import logo from './assets/logo.svg'
import profile from './assets/profile.svg'
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import Loader from '../Loader/Loader';
/**
 * @description Header for pages
 */

import burgerIcon from './assets/burger.svg'

const Header = () => {
    const {store} = useContext(Context)

    const [burger, setBurger] = useState(false)

    useEffect(() => {
        if(store.headerAuth == true){
            if(localStorage.getItem('token')){
                store.checkAuth()
            }
        }
    }, [])

    if(store.headerAuth == true & store.isLoading){
        return <Loader/>
    }

    return (
        <div className={style.header__wrapper}>
            <div className={style.header__wrapper}>
                <header className={burger ? style.active : null}>
                    <a href='/'><img src={logo} alt="Logo" className={style.logo}/></a>
                    <ul className={style.nav}>
                        <ul className={style.nav__item}><a href='/'>Главная</a></ul>
                        {store.isAuth ? <ul className={style.nav__item}><a href='/games'>Играть</a></ul> : null}
                        {store.isAuth ? <ul className={style.nav__item}><a href='/leaders'>Рейтинг</a></ul> : null}
                        <ul className={style.nav__item}><a href='https://vk.com/nokoko12'>Контакты</a></ul>
                    </ul>
                    <div className={style.burger} onClick={() => setBurger(!burger)}><img src={burgerIcon} /></div>
                    
                    {!store.user?.email ? 
                        <div className={style.login}><a href="/login">Войти</a></div>
                        : 
                        <div className={style.profile}><a href="/profile"><img src={store.user.avatarURL ? store.user.avatarURL : profile} alt="[P]" /></a></div>
                    }
                </header>  
            </div>
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