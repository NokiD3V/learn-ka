import React, { useContext, useEffect } from 'react';
import './style/header.style.scss'
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


    if(store.isAuth){
        return (
            <div className="header__wrapper">
                <header>
                    <a href='/'><img src={logo} alt="Logo" className="logo"/></a>
                    <ul className="nav">
                        <ul className="nav__item"><a href='/games'>Играть</a></ul>
                        <ul className="nav__item"><a href='/rating'>Рейтинг</a></ul>
                        <ul className="nav__item"><a href='/shop'>Магазин</a></ul>
                    </ul>
                    <div className="profile"><a href="/profile">Профиль</a><img src={profile} alt="[P]" /></div>
                </header>  
            </div>
        )
    }
    return (
        <div className="header__wrapper">
            <header>
                <a href='/'><img src={logo} alt="Logo" className="logo"/></a>
                <ul className="nav">
                    <ul className="nav__item"><a href='/'>Главная</a></ul>
                    <ul className="nav__item"><a href='#'>О нас</a></ul>
                    <ul className="nav__item"><a href='#'>Контакты</a></ul>
                </ul>
                <div className="profile"><a href="/profile">Профиль</a><img src={profile} alt="[P]" /></div>
            </header>  
        </div>
    );
}

export default observer(Header);