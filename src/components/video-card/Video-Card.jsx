import { VideoCardImg, VideoCardMenu, VideoCardContent, VideoCardFooter } from "./index"
import { deleteHistoryFromServer } from "../../services"
import { useAuth } from "../../context/auth-context"
import { useUserData } from "../../context/user-data-context"
import { Link } from "react-router-dom"
import { PlaylistModal } from "../index";
import { useEffect, useState } from "react"

import "./video-card.css"
export const VideoCard = ({ video, history, modalOpen, setModalOpen }) => {
    const { token } = useAuth()
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [open, setOpen] = useState(false);
    const { userDataState, userDataDispatch } = useUserData()

    useEffect(() => {
        if (showPlaylistModal) {
            setModalOpen(true)
        } else {
            setModalOpen(false)
        }

    }, [showPlaylistModal, open])

    return (
        <div className={` ${modalOpen ? "" : "video-card"}  ${history ? "pos-rel" : ""}`}>
            <Link to={`/videos/${video._id}`} className="video-card-link">
                <div className="video-card-img">
                    <VideoCardImg id={video._id} title={video.title} />
                </div>
                <div className="video-card-body">
                    <div className="video-card-content">
                        <VideoCardContent heading={video.title} />
                        <VideoCardMenu item={video} playlistState={setShowPlaylistModal} setOpen={setOpen} open={open} />
                    </div>
                    <div>
                        <VideoCardFooter date={video.uploadDate} creator={video.creator} />
                    </div>
                </div>
            </Link>
            {
                showPlaylistModal && (
                    <PlaylistModal
                        showModal={showPlaylistModal}
                        hideModal={setShowPlaylistModal}
                        newVideo={video}
                    />
                )
            }
            {
                history && <div style={{ position: "absolute", top: "5%", right: "5%" }}>
                    <button className="btn-sm btn-danger border-squre" onClick={() => {
                        deleteHistoryFromServer(video._id, token, userDataDispatch)
                    }}> <i class="fa fa-times"></i></button>
                </div>

            }
        </div>
    )
}

