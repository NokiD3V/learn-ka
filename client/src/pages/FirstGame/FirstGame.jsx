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
    const [task, setTask] = useState({})
    const [incorrect, setIncorrect] = useState('')

        
    useEffect(() => {
        const getTask = async () => {
            if(store?.user?.currentTask >= 7) return;
            const _task = await store.getTask()
            setTask(_task.task)
        }
        getTask()
    }, [])

    if(store.isLoading){
        return <Loader/>
    }

    if(store?.user?.currentTask >= 7){
        return (
            <div>
                <Header/>
                <div className={style.wrapper}>
                    <div className={style.content}>
                        <div className={style.win__title}>Поздравляем с прохождением!</div>
                        <div className={style.win__description}>Вы прошли первый блок орфографии, следующие ещё в разработке, ожидайте их появления на сайте!</div>
                        <img src={require('./assets/win.png')} className={style.win__img} />
                        <a className={style.win__btn} href='/games'>Вернуться назад</a>
                    </div>
                </div>
            </div>
        )
    }




    const sendAnswer = async (taskID, n) => {
        const data = await store.sendTaskAnswer(taskID, n)
        console.log(data)
        if(data.success) setTimeout(() => window.location.reload(), 300)
        else{
            setIncorrect(data.rule)
        }
    }

    return (
        <div> 
            { incorrect.length > 1 ?
                <div className={style.modal}>
                    <div className={style.modal__wrapper}>
                        <div className={style.modal__title}>Упс.. Вы допустили ошибку :(</div>
                        <img src={require('./assets/sad.png')} alt="" className={style.sad__img} />
                        <div className={style.rule}>{incorrect}</div>
                        <div className={style.modal__btn} onClick={() => {
                            window.location.reload()
                        }}>Попробовать заново</div>
                    </div>
                </div>
            : null}
            <Header/>
            <div className={style.wrapper}>
                <div className={style.content}>
                    <div className={style.task__title}>{task.title}</div>
                    {task?.choice ? 

                    <div className={style.choice}>
                        {task.choice.map(n => {
                            return (
                                <div className={style.choice__item} onClick={() => {
                                    sendAnswer(task.id, n)
                                }}>
                                    {n}
                                </div>
                            )
                        })}
                    </div>

                    : null}
                    

                </div>
            </div>
            
        </div>
            
    );
}

export default observer(FirstGame);
