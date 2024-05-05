import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react-lite'
import Loader from '../../utilities/Loader/Loader';
import Header from '../../utilities/Header/Header';
import style from './style/profile.module.scss'
import Chart from './Chart/Chart';

const ProfilePage = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate()
    const [ipAddress, setIPAddress] = useState('')
    const progress = 30

    // useEffect(() => {
    //     if(localStorage.getItem('token')){
    //         store.checkAuth()
    //     }
    // }, [])

    useEffect(() => {
      console.log(store.user)
    }, [])

    // useEffect(() => {
    //     if(!store.isAuth && !store.isLoading){
    //         console.log(store.isAuth)
    //         navigate("/login", {replace: true})
    //         return
    //     }
    // }, [store.isAuth])
    // if(store.isLoading){
    //     console.log("Loading",store.isLoading)

    //     return <Loader/>
    // }
    

  
    return (
      <div>
        <Header/>
        <div className={style.content}>
          <div className={style.wrapper}>
            <div className={style.profile__info}>
              <div className={style.avatar}>
                <img src={require('./icon.png')} />
                <div className={style.avatar__title}>Аватар {store.user.name + " " + store.user.surname}</div>
                <button onClick={() => {
                  store.logout()
                }}>Выйти</button>
              </div>
              <div className={style.tasks}>
                <div className={style.tasks__title}>Статистика</div>
                <div className={style.tasks__item}>Решённых задач: {store.user.failedTasks + store.user.successTasks}</div>
                <div className={style.tasks__item}>Правильные ответы: {store.user.successTasks}</div>
                <div className={style.tasks__item}>Процент успеха: {store.user.failedTasks + store.user.successTasks != 0 ? Math.floor(store.user.successTasks / (store.user.failedTasks + store.user.successTasks)  * 100) : 0}%</div>
              </div>
            </div>
            <div className={style.profile__stats}>
              <Chart className={style.chart} userData={JSON.parse(store?.user?.tasksHistory)} lastWork={store.user.lastWorkDate}/>
            </div>
            
          </div>
        </div>
      </div>
    )
}

export default observer(ProfilePage);
