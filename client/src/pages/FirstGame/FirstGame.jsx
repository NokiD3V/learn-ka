import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react-lite'
import Header from '../../utilities/Header/Header';
import style from './style/firstgame.module.scss'
import image from './assets/image1.png'
import Loader from '../../utilities/Loader/Loader';


const FirstGame = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate()
    
    useEffect(() => {
        if(store.user){
            if(store?.user?.currentTask > 50){
                
            }
        }
    }, [store.user])

    if(store.isLoading){
        return <Loader/>
    }

    if(store?.user?.currentTask >= 50){
        return (
            <div>
                <Header/>
                <div>
                    Ты победил уже, куда тебе..
                </div>
            </div>
        )
    }

    return (
        <div> 
            <Header/>
            <div className={style.wrapper}>
                <div className={style.content}>

                </div>
            </div>
        </div>
            
    );
}

export default observer(FirstGame);
