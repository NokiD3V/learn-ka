import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react-lite'
import Header from '../../utilities/Header/Header';
import style from './style/leaders.module.scss'
import image from './assets/image1.png'
import Loader from '../../utilities/Loader/Loader';


const Leaders = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            let _users = await store.getLeaderboard()
            if(!_users?.data) return;
            let sorted_users = _users.data.sort((a, b) => {
                return b.currentTask  / 25 - a.currentTask / 25
            })
            setUsers(sorted_users)
            console.log(_users)
        }
        getUsers()
    }, [])

    return (
        <div> 
            <Header/>
            <div className={style.wrapper}>
                <div className={style.content}>
                    <div className={style.title__col}>
                        <div className={style.title__col__item}>Пользователь</div>
                        <div className={style.title__col__item}>Пройдено</div>
                        <div className={style.title__col__item}>Верных ответов</div>
                        <div className={style.title__col__item}>Неверных ответов</div>
                        <div className={style.title__col__item}>Процент верности</div>
                    </div>
                    {users.map(n => {
                        return (
                            <div className={style.user__item}>
                                <div className={style.user__info}>
                                    <img src={require('./assets/icon.png')} className={style.avatar}/>
                                    <div className={[style.user__name, (n.id == store.user?.id ? style.user__self : null)].join(" ")}>{n.name} {n.surname.slice(0, 1)}.</div>
                                </div>
                                <div className={style.user__number}>{Math.floor(n.currentTask / 25 * 100)}%</div>
                                <div className={style.user__number}>{n.successTasks}</div>
                                <div className={style.user__number}>{n.failedTasks}</div>
                                <div className={style.user__number}>{Math.floor(n.successTasks / (n.successTasks + n.failedTasks) * 100) || 0}%</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
            
    );
}

export default observer(Leaders);
