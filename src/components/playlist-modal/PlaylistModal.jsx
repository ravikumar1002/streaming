import "./playlist-modal.css";
import { useState ,useEffect} from "react";
import { postPlaylist, postVideoInPlaylist } from "../../api-calls";
import { useAuth } from "../../context/auth-context";
import { useUserData } from "../../context/user-data-context";

export const PlaylistModal = ({ showModal, hideModal, newVideo }) => {
    const [showNewPlaylistForm, setShowNewPlaylistForm] = useState(false);
    const [playlistname, setPlaylistName] = useState({
        title: ""
    });
    const { token } = useAuth()
    const {userDataState,userDataDispatch} = useUserData()

    const createNewPlayList = async (nameOfPlaylist, authToken) => {
        const getNewPlaylist = await postPlaylist(nameOfPlaylist, authToken)
        userDataDispatch({
            type:"ADD_PAYLIST_BY_POST",
            payload: {
                postPlaylistData: getNewPlaylist.playlists
            }
        })
    };
    const addNewVideoInPlayList = async (playlistId, videoForAdd, authToken) => {
        const getNewVideoInPlaylist = await postVideoInPlaylist(playlistId, videoForAdd, authToken)
    };

    return (
        <div className={`${showModal ? "playlist-modal-wrapper" : "d-none"}`}>
            <div className="playlist-modal">
                <div>
                    <div>
                        <span>Save To...</span>
                        <span
                            onClick={() => {
                                hideModal(false);
                            }}
                        >
                            +
                        </span>
                    </div>
                </div>
                <ul>
                    {userDataState?.playlist.length > 0 && userDataState?.playlist.map((list) => {
                        return <li className="playlists-in-modal" key={list._id} onClick={() => {
                            addNewVideoInPlayList(list._id, newVideo, token)
                        }}>{list.title}</li>;
                    })}
                </ul>
                {showNewPlaylistForm ? (
                    <div>
                        <h4>Name</h4>
                        <input
                            type="text"
                            placeholder="Enter Playlist Name"
                            onChange={(e) => {
                                setPlaylistName((prev) => {
                                    return {
                                        ...prev,
                                        title: e.target.value,
                                    }
                                });
                            }}
                        />
                        <button
                            onClick={() => {
                                setShowNewPlaylistForm(false);
                                createNewPlayList(playlistname, token);
                            }}
                        >
                            Create
                        </button>
                    </div>
                ) : <div>
                    <button
                        onClick={() => {
                            setShowNewPlaylistForm(true);
                        }}
                    >
                        Create New Playlist
                    </button>
                </div>}
            </div>
        </div>
    );
};
