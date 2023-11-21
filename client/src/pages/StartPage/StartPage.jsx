import React, { Component } from 'react';
import './style/startpage.style.scss'
import homepic from './assets/home_img.png'
import logo from './assets/logo.svg'
import profile from './assets/profile.svg'
/**
 * @description Default home page for info about project, Figma-file in README.md
 */

class StartPage extends Component {
    render() {
        return (
            <div>
                <div className="wrapper">
                    <header>
                        <img src={logo} alt="Logo" className="logo" />
                        <ul className="nav">
                            <ul className="nav__item"><a href='#'>Главная</a></ul>
                            <ul className="nav__item"><a href='#'>О нас</a></ul>
                            <ul className="nav__item"><a href='#'>Контакты</a></ul>
                        </ul>
                        <div className="profile">Профиль <img src={profile} alt="[P]" /></div>
                    </header>
                    <div className="content">
                        <div className="text">
                            <div className="left__side">
                                <div className="title">Научись-ка</div>
                                <div className="description">Сервис для улучшения навыков правописания в русском языке. Создавай своего персонажа, получай опыт, сражайся и получай большие призы! Узнай, кто лучше знает русский язык!</div>
                            </div>
                            <div className="right__side"><img src={homepic} alt="Image learn-ka teacher" /></div>
                        </div>
                        <a className="button" href='#'>Участвовать!</a>
                    </div>
                </div>
            </div>
                
        );
    }
}

export default StartPage;