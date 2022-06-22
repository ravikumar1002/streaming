import { useState } from "react";
import { PlaylistModal } from "../../../../components";
import { useAuth } from "../../../../context/auth-context";
import { addVideoInWatchLater, deleteVideoFromWatchLater, addVideoInLiked, deleteVideoFromLiked } from "../../../../services"
import { useUserData } from "../../../../context/user-data-context";
import {  toast } from 'react-toastify';
import { VideoPlayerMenu } from "./VideoPlayerMenu";
import { VideoCardMenu } from "../../../../components/video-card";

export const VideoPlayerCentre = ({ currentVideo }) => {
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const { token } = useAuth();
    const { userDataState, userDataDispatch } = useUserData();
    const findExistsOrNot = (state, value) => {
        return state.find(video => video._id === value) ? true : false
    }

    return (
        <div className='single-video-centre'>
            <div>
                <h3>{`${currentVideo.title}`}</h3>
            </div>
            <VideoPlayerMenu currentVideo={currentVideo} setShowPlaylistModal = {setShowPlaylistModal} className= "show-menu"/>
            
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