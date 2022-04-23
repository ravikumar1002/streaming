import { useState } from "react";
import { useAuth } from "../../../context/auth-context";
import { PlaylistModal } from "../../../components/playlist-modal/PlaylistModal";

export const VideoCardMenu = ({ item }) => {
    const { token } = useAuth();
    const [showVideoMenuContent, setShowVideoMenuContent] = useState(false);
    const [elementTarget, setElementTarget] = useState()
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);

    // window.onclick = function (e) {
    //     if (e.target !== elementTarget) {
    //         setShowVideoMenuContent(false)
    //     }
    // }


    return (
        <>
            <button onClick={(e) => {
                setElementTarget(e.target)
                setShowVideoMenuContent(!showVideoMenuContent)
            }} className="fa-solid fa-ellipsis-vertical btn-sm" >
            </button>
            {showVideoMenuContent && (
                <div className="toggle-video-menu">
                    <div>
                        <i className="fa-solid fa-clock-rotate-left"></i><span>Save to Watch Later</span>
                    </div>
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
