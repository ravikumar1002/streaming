import { useUserData } from "../../context/user-data-context"
import { getWatchLater } from "../../api-calls"
import { useEffect } from "react"
import { useAuth } from "../../context/auth-context"
import { VideoCard } from "../../components/video-card/Video-Card"
export const WatchLater = () => {

    const { userDataState, userDataDispatch } = useUserData()
    const { token } = useAuth()

    const getAllSavedWatchLaterVideo = async (authToken) => {
        const getWatchLaterData = await getWatchLater(authToken)
        userDataDispatch({
            type: "WATCH_LATER_VIDEOS",
            payload: {
                watchLaterVideos: getWatchLaterData.watchlater
            }
        })
    }

    useEffect(() => {
        getAllSavedWatchLaterVideo(token)
    }, [])

    return (
        <div>
            {userDataState.watchLater.length > 0 ? userDataState.watchLater.map((video) => {
                return (

                    <VideoCard video={video} key={video._id} />
                )
            }) : <p>Watch later is empty</p>}
        </div>
    )
}