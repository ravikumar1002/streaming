import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { PlaylistModal } from "../index";
import { useUserData } from "../../context/user-data-context";
import { postWatchLaterVideo, deleteWatchLaterVideo } from "../../api-calls";

export const VideoCardMenu = ({ item }) => {
    const { userDataState, userDataDispatch } = useUserData();
    const { token } = useAuth();
    const [showVideoMenuContent, setShowVideoMenuContent] = useState(false);
    const [elementTarget, setElementTarget] = useState()
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);

    window.onclick = function (e) {
        if (e.target !== elementTarget) {
            setShowVideoMenuContent(false)
        }
    }

    const addVideoInWatchLater = async (authToken, watchLatervideo) => {
        const saveWatchLaterVideoInServer = await postWatchLaterVideo(
            authToken,
            watchLatervideo
        );
        userDataDispatch({
            type: "WATCH_LATER_VIDEOS",
            payload: {
                watchLaterVideos: saveWatchLaterVideoInServer.watchlater
            }
        })
    };

    const deleteVideoFromWatchLater = async (authToken, watchLatervideoId) => {
        const deleteWatchLaterVideoInServer = await deleteWatchLaterVideo(
            authToken,
            watchLatervideoId
        );
        userDataDispatch({
            type: "WATCH_LATER_VIDEOS",
            payload: {
                watchLaterVideos: deleteWatchLaterVideoInServer.watchlater
            }
        })
    };

    const findExistsOrNot = (state, value) => {
        return state.find(video => video._id === value) ? true : false
    }


    return (
        <>
            <button onClick={(e) => {
                setElementTarget(e.target)
                setShowVideoMenuContent(!showVideoMenuContent)
            }} className="fa-solid fa-ellipsis-vertical btn-sm" >
            </button>
            {showVideoMenuContent && (
                <div className="toggle-video-menu">
                    {/* <div> */}
                    {findExistsOrNot(userDataState.watchLater, item._id) ?
                        <div
                            onClick={() => {
                                if (token) {
                                    deleteVideoFromWatchLater(token, item._id)
                                }
                            }}
                        >
                            <i className="fa-solid fa-clock-rotate-left"></i>
                            <span> Remove From Watch Later </span>
                        </div> :
                        <div
                            onClick={() => {
                                if (token) {
                                    addVideoInWatchLater(token, item);
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
                    {/* </div> */}
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
