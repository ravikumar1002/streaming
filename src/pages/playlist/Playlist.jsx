import { useState, useEffect } from "react"
import { getPlaylist } from "../../api-calls"
import { useAuth } from "../../context/auth-context"
import { useUserData } from "../../context/user-data-context"
import { PlaylistCard } from "./components"
import { Link } from "react-router-dom"
export const PlayList = () => {
    const { userDataState, userDataDispatch, } = useUserData()

    const { token } = useAuth()
    const getAllPlaylistFromServer = async (token) => {
        const playlistData = await getPlaylist(token)
        userDataDispatch({
            type: "USER_ALL_PLAYLIST",
            payload: {
                playlistVideoData: playlistData.playlists
            }
        })
    }

    useEffect(() => {
        getAllPlaylistFromServer(token)
    }, [])

    return (
        <div>
            <p>PlayList</p>
            {userDataState.playlist.length > 0 ? userDataState.playlist.map((videoPlaylist) => {
                return (
                    <div key={videoPlaylist._id}>
                        <Link to={`/playlist/${videoPlaylist._id}`}><PlaylistCard videoPlaylist={videoPlaylist} /></Link>
                    </div>
                )
            }) : <p>empty playlist</p>}
        </div>
    )
}