import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signupHandler } from "../api-calls/getAuth";

export const authContext = createContext({})

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const location = useLocation()
    const navigate = useNavigate()

    const userSignUp = async ({ email, password }) => {
        const data = await signupHandler(email, password)
        localStorage.setItem(
            'userHasLogged',
            JSON.stringify({ token: data?.encodedToken, user: data?.createdUser })
        );
        setUser(data)
        navigate(location?.state?.from?.pathname)
    }


    return <authContext.Provider value={{ userSignUp, user, token: user?.encodedToken }}>
        {children}
    </authContext.Provider>
}

const useAuth = () => useContext(authContext)
export { useAuth, AuthProvider }