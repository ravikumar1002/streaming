import { useState, useEffect } from "react"
import { getAllPlaylistFromServer, deletePlaylistFromServer } from "../../services"
import { useAuth } from "../../context/auth-context"
import { useUserData } from "../../context/user-data-context"
import { PlaylistCard } from "./components"
import { Link } from "react-router-dom"
import "./playlist.css"
import { EmptyPage } from "../../components/empty-page/EmptyPage"
export const PlayList = () => {
    const { userDataState, userDataDispatch, } = useUserData()

    const { token } = useAuth()

    useEffect(() => {
        getAllPlaylistFromServer(token, userDataDispatch)
    }, [])

    return (
        <div className="playlist-page">
            {userDataState.playlist.length > 0 && <div className="playlist-card-wrapper grid-layout " >
                {userDataState.playlist.map((videoPlaylist) => {
                    return (
                        <div key={videoPlaylist._id}>
                            <Link to={`/playlist/${videoPlaylist._id}`} className="text-decoration-none"><PlaylistCard videoPlaylist={videoPlaylist} deletePlaylistFromServer={deletePlaylistFromServer} token={token} userDataDispatch={userDataDispatch} /></Link>
                        </div>
                    )
                })}
            </div>}
            {userDataState.playlist.length === 0 && <EmptyPage emptyText={"Your playlist is Empty"} btnText={"Start Explore"} linkRoute={"/videos"} />}
        </div>
    )
}