import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signupHandler, loginHandler } from "../api-calls/index";

export const authContext = createContext({})

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        encodedToken: '',
        userData: {}
    })

    const navigate = useNavigate()
    const location = useLocation()

    const setLocalStroge = (data) => {
        localStorage.setItem(
            'userHasLogged',
            JSON.stringify({ token: data?.encodedToken, user: data?.createdUser })
        );
    }

    const setData = (data) => {
        setUser({
            encodedToken: data?.encodedToken,
            userData: data?.createdUser
        })
    }

    const setPath = (path) => {
        if (path?.state === null) {
            if(path.state){
            navigate(path?.state)
            }else{
            navigate(path?.pathname)
            }
        } else {
            navigate(path?.state?.from?.pathname)
        }
    }

    const userSignUp = async ({ email, password }, path) => {
        const data = await signupHandler(email, password)
        setLocalStroge(data)
        setData(data)
        setPath(path)
    }

    const userlogin = async ({ email, password }, path) => {
        const data = await loginHandler(email, password)
        setLocalStroge(data)
        setData(data)
        setPath(path)
    }

    const removeData = () => {
        setUser({
            encodedToken: '',
            userData: {}
        })
    }

    const getLocalData = async (path) => {
        const localStrogeItem = await { ...JSON.parse(localStorage.getItem("userHasLogged")).user }
        await userSignUp({
            email: localStrogeItem.email,
            password: localStrogeItem.password,
            name: localStrogeItem.name
        }, path)
    }

    useEffect(() => {
        if ((JSON.parse(localStorage.getItem("userHasLogged"))?.token) && (!user.encodedToken)) {
            getLocalData(location)
        }
    }, [])


    return <authContext.Provider value={{ userSignUp, userlogin, user, token: user?.encodedToken }}>
        {children}
    </authContext.Provider>
}

const useAuth = () => useContext(authContext)
export { useAuth, AuthProvider }