import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUserData } from "../../context/user-data-context"
import { PlaylistVideo } from "./components/playlist-video/PlaylistVideo"
import { EmptyPage } from "../../components/empty-page/EmptyPage"
import { useDocumentTitle } from "../../hooks/useDocumentTilte"

export const SinglePlaylistPage = () => {
    const { playlistid } = useParams()
    const { userDataState, userDataDispatch } = useUserData()
    const [videosInCurrentPlaylist, setVideoInCurrentPlaylist] = useState({
        videos: []
    })

    const getVideosInPlaylist = (allPlaylist, playlistID) => {
        const inPlaylistVideo = allPlaylist.find((playlist) => playlist._id === playlistID);
        console.log(inPlaylistVideo)
        setVideoInCurrentPlaylist(inPlaylistVideo)
    }

    useEffect(() => {
        getVideosInPlaylist(userDataState.playlist, playlistid)
    }, [userDataState.playlist])

    useEffect(() => {
         useDocumentTitle(videosInCurrentPlaylist?.title)
    }, [])

    return (
        <div style={{ height: "100%" }}>

            {videosInCurrentPlaylist?.videos.length > 0 && <div  className="grid-layout">
                {videosInCurrentPlaylist?.videos.map((video) => {
                    return (
                            <PlaylistVideo video={video} playlistIdForVideo={videosInCurrentPlaylist._id} key={video._id} />
                    )
                })}</div>
            }
            {videosInCurrentPlaylist?.videos.length  === 0 && <EmptyPage emptyText={`Your ${videosInCurrentPlaylist?.title} is Empty`} btnText={"Start Explore"} linkRoute={"/videos"} />}
        </div>
    )
}