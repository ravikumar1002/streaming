import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signupHandler, loginHandler } from "../api-calls/index";

export const authContext = createContext({})

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const location = useLocation()
    const navigate = useNavigate()

    // const localStrogeItem = JSON.parse(localStorage.getItem("userHasLogged"))
    // useEffect(() => {
    //     if(localStrogeItem?.token){
    //         (async() => {
    //             const data = await signupHandler(localStrogeItem.user.email, localStrogeItem.user.password)
    //             setUser(data)
    //         })()
    //     }
    // },[localStrogeItem])

    const userSignUp = async ({ email, password }) => {
        const data = await signupHandler(email, password)
        localStorage.setItem(
            'userHasLogged',
            JSON.stringify({ token: data?.encodedToken, user: data?.createdUser })
        );
        setUser(data)
        navigate(location?.state?.from?.pathname)
    }

    const userlogin = async({ email, password }) => {
        const data = await loginHandler(email, password)
        console.log(data)
        localStorage.setItem(
            'userHasLogged',
            JSON.stringify(data)
        );
        setUser(data)
        navigate(location?.state?.from?.pathname)
    }

    return <authContext.Provider value={{ userSignUp, userlogin, user, token: user?.encodedToken }}>
        {children}
    </authContext.Provider>
}

const useAuth = () => useContext(authContext)
export { useAuth, AuthProvider }