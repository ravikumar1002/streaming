import { useState, useEffect } from "react"
import { getAllPlaylistFromServer, deletePlaylistFromServer } from "../../services"
import { useAuth } from "../../context/auth-context"
import { useUserData } from "../../context/user-data-context"
import { PlaylistCard } from "./components"
import { Link } from "react-router-dom"
import "./playlist.css"
export const PlayList = () => {
    const { userDataState, userDataDispatch, } = useUserData()

    const { token } = useAuth()
    
    useEffect(() => {
        getAllPlaylistFromServer(token, userDataDispatch)
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
                                deletePlaylistFromServer(videoPlaylist._id, token, userDataDispatch)
                            }}
                                style={{ position: "absolute", bottom: "2%", right: "2%" }}
                            >
                                <i className="fa fa-trash" ></i>
                            </div>
                        </div>
                    )
                }) : <div>
                    <p>Your Playlist is Empty</p>
                    <button className="btn-sm border-squre form-submit btn-block">Start Exporling</button>
                    </div>}
            </div>
        </div>
    )
}