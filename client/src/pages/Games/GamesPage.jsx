import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react-lite'
import Loader from '../../utilities/Loader/Loader';
import Header from '../../utilities/Header/Header';
import style from './style/games.module.scss'

const GamesPage = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate()
    const [ipAddress, setIPAddress] = useState('')
    const [progress, setProgress] = useState(0)
    
    useEffect(() => {
      if(store.isAuth){
        setProgress(Math.floor(store.user.currentTask / 25 * 100))
      }
    }, [])
  
    return (
      <div>
        <Header/>
        <div className={style.content}>
          <div className={style.wrapper}>
            <div className={style.cards}>
              <div className={style.card} onClick={() => {
                navigate('/writecorrect', {replace: true})
              }}>
                <div className={style.card__info}>
                  <div className={style.card__title}>Пиши правильно!</div>
                  <div className={style.description}>Тестирование орфографии и пунктуации через тесты с вариантами ответов</div>
                  <div className={style.progress__bar}>Прогресс {progress}%</div>
                  <div className={style.progress__bar__bar}>
                    <div className={style.progress__status} style={{
                      maxWidth:`${progress}%`
                    }}></div>
                  </div>
                </div>
                <img src="https://i.imgur.com/aVtZJwA.png" className={style.card__img} />
              </div>
            </div>
          </div>
        </div>

      </div>
    )
}

export default observer(GamesPage);
