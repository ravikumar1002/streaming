import { useState } from "react";
import { useAuth } from "../../../context/auth-context";
import { addVideoInWatchLater, deleteVideoFromWatchLater, addVideoInLiked, deleteVideoFromLiked } from "../../../services"
import { useUserData } from "../../../context/user-data-context";
import {  toast } from 'react-toastify';

export const VideoPlayerMenu = ({ currentVideo, setShowPlaylistModal }) => {
    const { token } = useAuth();
    const { userDataState, userDataDispatch } = useUserData();
    const findExistsOrNot = (state, value) => {
        return state.find(video => video._id === value) ? true : false
    }

    return (
        <div className="single-video-icons">
            {
                findExistsOrNot(userDataState.liked, currentVideo._id) ?
                    <span onClick={() => {
                        deleteVideoFromLiked(token, currentVideo._id, userDataDispatch);
                    }}>
                        <i className="fa-solid fa-heart"></i>
                    </span>
                    :
                    <span onClick={() => {
                        if (token) {
                            addVideoInLiked(token, currentVideo, userDataDispatch);
                        } else {
                            toast.error("You are not logged in")
                        }
                    }}>
                        <i className="fa-regular fa-heart"></i>
                    </span>
            }
            {findExistsOrNot(userDataState.watchLater, currentVideo._id) ?
                <span onClick={() => {
                    deleteVideoFromWatchLater(token, currentVideo._id, userDataDispatch);

                }}>
                    <i className="fa-solid fa-clock"></i>
                </span>
                :
                <span onClick={() => {
                    if (token) {
                        addVideoInWatchLater(token, currentVideo, userDataDispatch);
                    } else {
                        toast.error("You are not logged in")
                    }
                }}>
                    <i className="fa-regular fa-clock"></i>
                </span>
            }

            <span onClick={() => {
                if (token) {
                    setShowPlaylistModal(true);
                } else {
                    toast.error("You are not logged in")
                }
            }}>
                <i className="fa-solid fa-list-ul"></i>
            </span>
        </div>
    )
}