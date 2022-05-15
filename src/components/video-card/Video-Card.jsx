import { VideoCardImg, VideoCardMenu, VideoCardContent, VideoCardFooter } from "./index"
import { deleteHistoryFromServer } from "../../services"
import { useAuth } from "../../context/auth-context"
import { useUserData } from "../../context/user-data-context"
import { Link } from "react-router-dom"
import { PlaylistModal } from "../index";
import {useState} from "react"

import "./video-card.css"
export const VideoCard = ({ video, history }) => {
    const { token } = useAuth()
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const { userDataState, userDataDispatch } = useUserData()

    return (
        <div className="video-card">
            <Link to={`/videos/${video._id}`} className="video-card-link">
                <div className="video-card-img">
                    <VideoCardImg id={video._id} title={video.title} />
                </div>
                <div className="video-card-body">
                    <div className="video-card-content">
                        <VideoCardContent heading={video.title} />
                        <VideoCardMenu item={video}  playlistState = {setShowPlaylistModal} />
                    </div>
                    <div>
                        <VideoCardFooter date={video.uploadDate} creator={video.creator} />
                    </div>
                </div>
            </Link>
            {/* <div style={{ position: "absolute", top: "75%", right: "1%"}}>
                        <VideoCardMenu item={video} />
            </div> */}
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
                history && <div style={{ position: "absolute", top: "5%", right: "1%" }}>
                    <button className="btn-sm btn-danger border-squre" onClick={() => {
                        console.log("his")
                        deleteHistoryFromServer(video._id, token, userDataDispatch)
                    }}> <i class="fa fa-times"></i></button>
                </div>

            }

        </div>
    )
}

