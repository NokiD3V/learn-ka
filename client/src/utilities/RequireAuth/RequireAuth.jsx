import { useContext, useEffect } from "react"
import { Context } from "../.."
import Loader from "../Loader/Loader"
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"

const RequireAuth = ({ children }) => {
    const {store} = useContext(Context)
    const navigate = useNavigate();
    store.headerAuth = false
    useEffect(() => {
        if(localStorage.getItem('token')){
            store.checkAuth()
        }
    }, [])

    useEffect(() => {
        if(!store.isAuth && !store.isLoading){
            console.log(store.isAuth)
            navigate("/login", {replace: true})
            return
        }
    }, [store.isAuth])

    if(store.isLoading){
        console.log("Loading",store.isLoading)
        return <Loader/>
    }

    return children
}


export default observer(RequireAuth);