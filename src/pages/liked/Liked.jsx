import { useUserData } from "../../context/user-data-context"
import { useAuth } from "../../context/auth-context"
import { getLiked } from "../../api-calls"
import { useEffect } from "react"
import { VideoCard } from "../../components"
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
        <div>
            {userDataState.liked.length > 0 ? userDataState.liked.map((video) => {
                return (

                    <VideoCard video={video} key={video._id} />
                )
            }) : <p>liked is empty</p>}
        </div>
    )
}