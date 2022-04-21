import { useState, useEffect } from "react"
import { getPlaylist } from "../../api-calls"
import { useAuth } from "../../context/auth-context"
import { useUserData } from "../../context/user-data-context"
export const PlayList = () => {
    const { userDataDispatch } = useUserData()

    const { token } = useAuth()
    const getAllPlaylistFromServer = async (token) => {
        const playlistData = await getPlaylist(token)
        console.log(playlistData)
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
        </div>
    )
}