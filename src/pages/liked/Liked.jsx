import { useUserData } from "../../context/user-data-context"
import { useAuth } from "../../context/auth-context"
import { getLiked } from "../../api-calls"
import { useEffect } from "react"
import { VideoCard } from "../../components"
import { EmptyPage } from "../../components/empty-page/EmptyPage"
export const Liked = () => {
    const { userDataState, userDataDispatch } = useUserData()
    const { token } = useAuth()

    const getAllLikedVideos = async (authToken) => {
        const getLikedVideoData = await getLiked(authToken)
        userDataDispatch({
            type: "LIKED_VIDEOS",
            payload: {
                likedVideos: getLikedVideoData.likes
            }
        })
    }

    useEffect(() => {
        getAllLikedVideos(token)
    }, [])

    return (
        <div style={{height: "100%"}}>
            {userDataState.liked.length > 0 && <div className="grid-layout">
                {userDataState.liked.map((video) => {
                    return (
                        <VideoCard video={video} key={video._id} />
                    )
                })}
            </div>}
            {userDataState.liked.length === 0 && <EmptyPage emptyText={"Your Likes is Empty"} btnText={"Start Explore"} linkRoute={"/videos"} />}
        </div>
    )
}