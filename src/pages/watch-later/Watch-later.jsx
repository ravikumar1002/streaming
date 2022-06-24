import { useUserData } from "../../context/user-data-context"
import { getWatchLater } from "../../api-calls"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth-context"
import { VideoCard } from "../../components/video-card/Video-Card"
import { EmptyPage } from "../../components/empty-page/EmptyPage"
export const WatchLater = () => {

    const { userDataState, userDataDispatch } = useUserData()
    const { token } = useAuth()
    const [modalOpen, setModalOpen] = useState(false)

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
        <div className={`${userDataState.watchLater.length === 0 ? "m-2 p-1" : "m-2 p-1"}`}>
            <div className="flex-space-between">
                <div>
                    <h2>Watch later</h2>
                </div>
            </div>
            <div className={`p-2 d-flex gap-2 ${userDataState.watchLater.length > 0 ? "grid-layout" : ""}`}>
                {userDataState.watchLater.length > 0 && <div>
                    {userDataState.watchLater.map((video) => {
                        return (

                            <VideoCard video={video} key={video._id} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
                        )
                    })}
                </div>}
                {userDataState.watchLater.length === 0 && <EmptyPage emptyText={"Your watchlater is empty"} btnText={"Start Explore"} linkRoute={"/videos"} />}
            </div>
        </ div>
    )

}