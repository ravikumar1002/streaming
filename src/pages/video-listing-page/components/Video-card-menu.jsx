import { useState } from "react";
import { useAuth } from "../../../context/auth-context";
import { PlaylistModal } from "../../../components/playlist-modal/PlaylistModal";

export const VideoCardMenu = ({ item }) => {
    const { token } = useAuth();
    const [showVideoMenuContent, setShowVideoMenuContent] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);

    return (
        <>
            <button onClick={(e) => {
                setShowVideoMenuContent(true)
                e.stopPropagation();
                console.log(e.stopPropagation())
                }}>
                <i className="fa-solid fa-ellipsis-vertical btn-sm"></i>
            </button>
            {showVideoMenuContent && (
                <div className="toggle-video-menu">
                    <div>
                        <span>Save to Watch Later</span>
                    </div>
                    <div
                        onClick={() => {
                            // if (token) {
                            setShowPlaylistModal(true);
                            setShowVideoMenuContent(false);
                            // }
                        }}
                    >
                        Save to Playlist
                    </div>
                </div>
            )}
            {showPlaylistModal && (
                <PlaylistModal
                    showModal={showPlaylistModal}
                    hideModal={setShowPlaylistModal}
                    newVideo = {item}
                />
            )}
        </>
    );
};
