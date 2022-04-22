import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUserData } from "../../context/user-data-context"
import { PlaylistVideo } from "./components/playlist-video/PlaylistVideo"

export const SinglePlaylistPage = () => {
    const { playlistid } = useParams()
    const { userDataState, userDataDispatch } = useUserData()
    const [videosInCurrentPlaylist, setVideoInCurrentPlaylist] = useState({
        videos: []
    })

    const getVideosInPlaylist = (allPlaylist, playlistID) => {
        const inPlaylistVideo = allPlaylist.find((playlist) => playlist._id === playlistID);
        setVideoInCurrentPlaylist(inPlaylistVideo)
    }

    useEffect(() => {
        getVideosInPlaylist(userDataState.playlist, playlistid)
    }, [])

    return (
        <div>
            <div>{videosInCurrentPlaylist?.title}</div>

            {videosInCurrentPlaylist?.videos.length > 0 ? videosInCurrentPlaylist?.videos.map((video) => {
                return (
                    <div key={video._id}>
                        <PlaylistVideo video={video} />
                    </div>
                )
            }) : <p>empty Playlist</p>}
        </div>
    )
}