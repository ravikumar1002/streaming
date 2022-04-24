import { useState, useEffect } from "react"
import { getPlaylist, deletePlaylist } from "../../api-calls"
import { useAuth } from "../../context/auth-context"
import { useUserData } from "../../context/user-data-context"
import { PlaylistCard } from "./components"
import { Link } from "react-router-dom"
import "./playlist.css"
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

    const deletePlaylistFromServer = async (playlistId, authToken) => {
        const getdeletedPlaylist = await deletePlaylist(playlistId, authToken)
        userDataDispatch({
            type: "USER_ALL_PLAYLIST",
            payload: {
                playlistVideoData: getdeletedPlaylist.playlists
            }
        })
    }



    useEffect(() => {
        getAllPlaylistFromServer(token)
    }, [])

    return (
        <div className="playlist-page">
            <h3>PlayList</h3>
            <div className="playlist-card-wrapper">
                {userDataState.playlist.length > 0 ? userDataState.playlist.map((videoPlaylist) => {
                    return (
                        <div key={videoPlaylist._id} style={{ position: "relative" }}>
                            <Link to={`/playlist/${videoPlaylist._id}`} className="text-decoration-none"><PlaylistCard videoPlaylist={videoPlaylist} /></Link>
                            <div onClick={() => {
                                deletePlaylistFromServer(videoPlaylist._id, token)
                            }}
                                style={{ position: "absolute", bottom: "2%", right: "2%" }}
                            >
                                <i className="fa fa-trash" ></i>
                            </div>
                        </div>
                    )
                }) : <p>empty playlist</p>}
            </div>
        </div>
    )
}