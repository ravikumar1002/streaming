import { useContext, useReducer, createContext } from "react";
import { videoReducer } from "../reducer/video-reducer"

const videoContext = createContext()

const VideoProvider = ({ children }) => {
    const videoReducerInitialState = {
        allVideos: []
    }

    const [videoState, videoDispatch] = useReducer(videoReducer, videoReducerInitialState)

    return (
        <videoContext.Provider value={{ videoState, videoDispatch}}>
            {children}
        </videoContext.Provider>
    )

}

const useVideoDataFromServer = () => useContext(videoContext)

export { useVideoDataFromServer, VideoProvider }