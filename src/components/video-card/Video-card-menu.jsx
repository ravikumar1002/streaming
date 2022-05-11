import { useState , useRef, useEffect} from "react";
import { useAuth } from "../../context/auth-context";
import { PlaylistModal } from "../index";
import { useUserData } from "../../context/user-data-context";
import { addVideoInWatchLater, deleteVideoFromWatchLater, addVideoInLiked, deleteVideoFromLiked } from "../../services"


export const VideoCardMenu = ({ item }) => {
    const { userDataState, userDataDispatch } = useUserData();
    const { token } = useAuth();
    const [showVideoMenuContent, setShowVideoMenuContent] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [open, setOpen] = useState(false);
    const container = useRef();

    const findExistsOrNot = (state, value) => {
        return state.find(video => video._id === value) ? true : false
    }

    const handleButtonClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickOutside = (e) => {
        if (container?.current && !container?.current?.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="container" ref={container}>
            <button  onClick={(e) => {
                e.stopPropagation()
                handleButtonClick()
                }} className="fa-solid fa-ellipsis-vertical btn-sm " >
            </button>
            {open && (
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
                                    setOpen(false);
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
                                    setOpen(false);
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
                                setOpen(false);
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
        </div>
    );
};
