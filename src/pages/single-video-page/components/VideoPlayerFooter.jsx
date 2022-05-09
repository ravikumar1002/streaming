import { useState } from "react";
import { PlaylistModal } from "../../../components";
import { useAuth } from "../../../context/auth-context";
import { addVideoInWatchLater, deleteVideoFromWatchLater, addVideoInLiked, deleteVideoFromLiked } from "../../../services"
import { useUserData } from "../../../context/user-data-context";
export const VideoPlayerFooter = ({ currentVideo }) => {
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const { token } = useAuth();
    const { userDataState, userDataDispatch } = useUserData();
    const findExistsOrNot = (state, value) => {
        return state.find(video => video._id === value) ? true : false
    }

    return (
        <div className='single-video-footer'>
            <div>
                <h3>{`${currentVideo.title}`}</h3>
            </div>
            <div className="single-video-icons">
                {
                    findExistsOrNot(userDataState.liked, currentVideo._id) ?
                        <span onClick={() => {
                            if (token) {
                                deleteVideoFromLiked(token, currentVideo._id, userDataDispatch);
                            } else {
                                alert("login first");
                            }
                        }}>
                            <i className="fa-solid fa-heart"></i>
                        </span>
                        :
                        <span onClick={() => {
                            if (token) {
                                addVideoInLiked(token, currentVideo, userDataDispatch);
                            } else {
                                alert("login first");
                            }
                        }}>
                            <i className="fa-regular fa-heart"></i>
                        </span>
                }
                {findExistsOrNot(userDataState.watchLater, currentVideo._id) ?
                    <span onClick={() => {
                        if (token) {
                            deleteVideoFromWatchLater(token, currentVideo._id, userDataDispatch);
                        } else {
                            alert("login first");
                        }

                    }}>
                        <i className="fa-solid fa-clock"></i>
                    </span>
                    :
                    <span onClick={() => {
                        if (token) {
                            addVideoInWatchLater(token, currentVideo, userDataDispatch);
                        } else {
                            alert("login first");
                        }
                    }}>
                        <i className="fa-regular fa-clock"></i>
                    </span>
                }

                <span onClick={() => {
                    if (token) {
                        setShowPlaylistModal(true);
                    } else {
                        alert("login first")
                    }
                }}>
                    <i className="fa-solid fa-list-ul"></i>
                </span>
            </div>
            {showPlaylistModal && (
                <PlaylistModal
                    showModal={showPlaylistModal}
                    hideModal={setShowPlaylistModal}
                    newVideo={currentVideo}
                />
            )}
        </div>
    )
}