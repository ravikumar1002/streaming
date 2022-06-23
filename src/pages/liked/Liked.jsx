import { useUserData } from "../../context/user-data-context"
import { useAuth } from "../../context/auth-context"
import { getLiked } from "../../api-calls"
import { useEffect } from "react"
import { VideoCard } from "../../components"
import { EmptyPage } from "../../components/empty-page/EmptyPage"
import { useDocumentTitle } from "../../hooks/useDocumentTilte"
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
        useDocumentTitle("Liked")
    }, [])


    return (
        <div className={`${userDataState.liked.length === 0 ? "m-2 p-1" : "m-2 p-1"}`}>
            <div className="flex-space-between ">
                <div>
                    <h2>All Likes</h2>
                </div>
            </div>
            <div className={`p-2 d-flex gap-2 ${userDataState.liked.length > 0 ? "grid-layout" : ""}`}>
                {userDataState.liked.length > 0 && <div className="grid-layout">
                    {userDataState.liked.map((video) => {
                        return (
                            <VideoCard video={video} key={video._id} />
                        )
                    })}
                </div>}
                {userDataState.liked.length === 0 && <EmptyPage emptyText={"Your likes is empty"} btnText={"Start Explore"} linkRoute={"/videos"} />}
            </div>
        </ div>
    )
}