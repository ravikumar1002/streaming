import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { PlaylistModal } from "../index";
import { useUserData } from "../../context/user-data-context";
import { addVideoInWatchLater, deleteVideoFromWatchLater, addVideoInLiked, deleteVideoFromLiked } from "../../services"


export const VideoCardMenu = ({ item }) => {
    const { userDataState, userDataDispatch } = useUserData();
    const { token } = useAuth();
    const [showVideoMenuContent, setShowVideoMenuContent] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);

    const findExistsOrNot = (state, value) => {
        return state.find(video => video._id === value) ? true : false
    }

    return (
        <>
            <button onClick={(e) => {
                setShowVideoMenuContent(!showVideoMenuContent)
            }} className="fa-solid fa-ellipsis-vertical btn-sm" >
            </button>
            {showVideoMenuContent && (
                <div className="toggle-video-menu">
                    {findExistsOrNot(userDataState.liked, item._id) ?
                        <div
                            onClick={() => {
                                if (token) {
                                    deleteVideoFromLiked(token, item._id, userDataDispatch);
                                } else {
                                    alert("login first");
                                }
                            }}
                        >
                            <i className="fa-solid fa-heart"></i>
                            <span>Remove like</span>
                        </div>
                        : <div
                            onClick={() => {
                                if (token) {
                                    addVideoInLiked(token, item, userDataDispatch);
                                    setShowVideoMenuContent(false);
                                } else {
                                    alert("login first");
                                }
                            }}
                        >
                            <i className="fa-regular fa-heart"></i>
                            <span>  Add Like </span>
                        </div>
                    }
                    {findExistsOrNot(userDataState.watchLater, item._id) ?
                        <div
                            onClick={() => {
                                if (token) {
                                    deleteVideoFromWatchLater(token, item._id, userDataDispatch)
                                }
                            }}
                        >
                            <i className="fa-solid fa-clock-rotate-left"></i>
                            <span> Remove From Watch Later </span>
                        </div> :
                        <div
                            onClick={() => {
                                if (token) {
                                    addVideoInWatchLater(token, item, userDataDispatch);
                                    setShowVideoMenuContent(false);
                                } else {
                                    alert("login first");
                                }
                            }}
                        >
                            <i className="fa-solid fa-clock-rotate-left"></i>
                            <span>Save to Watch Later</span>
                        </div>
                    }
                    <div
                        onClick={() => {
                            if (token) {
                                setShowPlaylistModal(true);
                                setShowVideoMenuContent(false);
                            } else {
                                alert("login first")
                            }
                        }}
                    >
                        <i className="fa-solid fa-list-ul"></i> <span>Save to Playlist</span>
                    </div>
                </div>
            )}
            {showPlaylistModal && (
                <PlaylistModal
                    showModal={showPlaylistModal}
                    hideModal={setShowPlaylistModal}
                    newVideo={item}
                />
            )}
        </>
    );
};
