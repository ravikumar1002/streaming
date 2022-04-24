import { useContext, useReducer, createContext } from "react";
import { userDataReducer } from "../reducer/user-data-reducer";
const userDataContext = createContext()

const UserDataProvider = ({ children }) => {
    const userIntialData = {
        playlist: [],
        history: [],
    }
    const [userDataState, userDataDispatch] = useReducer(userDataReducer, userIntialData)

    return (
        <userDataContext.Provider value={{ userDataState, userDataDispatch }}>
            {children}
        </userDataContext.Provider>
    )

}

const useUserData = () => useContext(userDataContext)

export { useUserData, UserDataProvider }