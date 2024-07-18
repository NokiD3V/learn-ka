import React, { useContext, useEffect } from 'react';
import style from './style/startpage.module.scss'
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import Header from '../../utilities/Header/Header';
import Loader from '../../utilities/Loader/Loader';
import readed from './assets/readed.svg'
import earth from './assets/earthimg.png'

/**
 * @description Default home page for info about project, Figma-file in README.md 
 */

const StartPage = () => {
    const {store} = useContext(Context)

    return (
        <div>
            <div className={style.wrapper}>
                <Header/>
                <div className={style.content}>
                    <div className={style.title}>Научись-ка</div>
                    <div className={style.first__message}><span>Мечтаешь говорить и писать грамотнее на русском языке?</span><img className={style.readed} src={readed} alt="✔️" />.</div>
                    <div className={style.second__message}><span>Тогда быстрее <a href='/profile'>присоединяйся</a> к нашему самому лучшему сообществу!</span><img className={style.readed} src={readed} alt="✔️" /></div>
                    <div className={style.footer}><a href='#' onClick={() => {
                        window.location.href = "/profile"
                    }}><div className={style.join}>Присоединяйся к нам!</div><img src={earth} alt="" className={style.join__img}/></a></div>
                </div>
            </div>
        </div>
            
    );
}

export default observer(StartPage);