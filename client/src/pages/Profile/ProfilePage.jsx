import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react-lite'
import Loader from '../../utilities/Loader/Loader';
import Header from '../../utilities/Header/Header';
import style from './style/profile.module.scss'

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
            <h1>Your IP Address is: {ipAddress}</h1>
            <button onClick={() => {
                store.logout()
            }}>Logout</button>
          </div>
        </div>
      </div>
    )
}

export default observer(ProfilePage);
