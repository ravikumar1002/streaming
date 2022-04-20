import "./playlist-modal.css"
import { useState } from "react"

export const PlaylistModal = () => {
    const [showNewPlaylistForm, setShowNewPlaylistForm] = useState(false)
    const [createdPlaylist, setCreatedPlaylist] = useState([])

    return (
        <div>
            <div>
                <div><span>Save To...   </span> <span>+</span></div>
            </div>
            <ul>
                {
                    createdPlaylist.map((list) => {
                        return (
                            <li>{list.title}</li>
                        )
                    })

                }
            </ul>
            <div>
                <button onClick={() => {
                    setShowNewPlaylistForm(false)
                }}> Create New Playlist</button>
            </div>
            {showNewPlaylistForm && <div>
                <h4>Name</h4>
                <input type="text" placeholder="Enter Playlist Name" />
                <button onClick={() => {
                    setShowNewPlaylistForm(true)
                }}>Create</button>
            </div>}
        </div>
    )
}