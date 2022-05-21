import { useUserData } from "../../context/user-data-context"
import { getWatchLater } from "../../api-calls"
import { useEffect } from "react"
import { useAuth } from "../../context/auth-context"
import { VideoCard } from "../../components/video-card/Video-Card"
import { EmptyPage } from "../../components/empty-page/EmptyPage"
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
        <div style={{height: "100%"}}>
            {userDataState.watchLater.length > 0 && <div className="grid-layout">
                {userDataState.watchLater.map((video) => {
                    return (

                        <VideoCard video={video} key={video._id} />
                    )
                })}
            </div>}
            {userDataState.watchLater.length === 0 && <EmptyPage emptyText={"Your Watchlater is Empty"} btnText={"Start Explore"} linkRoute={"/videos"}/>}
        </div>
    )
}