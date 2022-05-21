import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/auth-context";
import { useUserData } from "../../context/user-data-context";
import { addVideoInWatchLater, deleteVideoFromWatchLater, addVideoInLiked, deleteVideoFromLiked } from "../../services"
import {  toast } from 'react-toastify';

export const VideoCardMenu = ({ item, playlistState }) => {
    const { userDataState, userDataDispatch } = useUserData();
    const { token } = useAuth();
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
            <button
                onClick={(e) => {
                    e.preventDefault()
                    handleButtonClick()
                }}
                className="fa-solid fa-ellipsis-vertical btn-sm "
            >
            </button>
            {
                open && (
                    <div className="toggle-video-menu">
                        {findExistsOrNot(userDataState.liked, item._id) ?
                            <div
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (token) {
                                        deleteVideoFromLiked(token, item._id, userDataDispatch);
                                    } else {
                                        toast.error("You are not logged in")
                                    }
                                }}
                            >
                                <i className="fa-solid fa-heart"></i>
                                <span>Remove like</span>
                            </div>
                            : <div
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (token) {
                                        addVideoInLiked(token, item, userDataDispatch);
                                        setOpen(false);
                                    } else {
                                        toast.error("You are not logged in")
                                    }
                                }}
                            >
                                <i className="fa-regular fa-heart"></i>
                                <span>  Add Like </span>
                            </div>
                        }
                        {findExistsOrNot(userDataState.watchLater, item._id) ?
                            <div
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (token) {
                                        deleteVideoFromWatchLater(token, item._id, userDataDispatch)
                                    }
                                }}
                            >
                                <i className="fa-solid fa-clock-rotate-left"></i>
                                <span> Remove From Watchlater </span>
                            </div> :
                            <div
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (token) {
                                        addVideoInWatchLater(token, item, userDataDispatch);
                                        setOpen(false);
                                    } else {
                                        toast.error("You are not logged in")
                                    }
                                }}
                            >
                                <i className="fa-solid fa-clock-rotate-left"></i>
                                <span>Save to Watchlater</span>
                            </div>
                        }
                        <div
                            onClick={(e) => {
                                e.preventDefault()
                                if (token) {
                                    playlistState(true);
                                    setOpen(false);
                                } else {
                                    toast.error("You are not logged in")
                                }
                            }}
                        >
                            <i className="fa-solid fa-list-ul"></i> <span>Save to Playlist</span>
                        </div>
                    </div>
                )
            }
        </div >
    );
};
