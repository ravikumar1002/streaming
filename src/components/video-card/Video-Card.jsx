import { VideoCardImg, VideoCardMenu, VideoCardContent, VideoCardFooter } from "./index"
import { deleteHistoryFromServer } from "../../services"
import { useAuth } from "../../context/auth-context"
import { useUserData } from "../../context/user-data-context"
import { Link } from "react-router-dom"
import "./video-card.css"
export const VideoCard = ({ video, history }) => {
    const { token } = useAuth()

    const { userDataState, userDataDispatch } = useUserData()

    return (
        <div className="video-card" style={{ position: "relative" }}>
            <Link to={`/videos/${video._id}`} className="video-card-link">
                <div className="video-card-img">
                    <VideoCardImg id={video._id} title={video.title} />
                </div>
                <div className="video-card-body">
                    <div className="video-card-content">
                        <VideoCardContent heading={video.title} />
                    </div>
                    <div>
                        <VideoCardFooter date={video.uploadDate} creator={video.creator} />
                    </div>
                </div>
            </Link>
            <div style={{ position: "absolute", top: "75%", right: "1%"}}>
                        <VideoCardMenu item={video} />
            </div>
            {
                history &&  <div style={{ position: "absolute", top: "5%", right: "1%"}}>
                    <button className="btn-sm btn-danger border-squre" onClick={() => {
                        console.log("his")
                        deleteHistoryFromServer(video._id, token , userDataDispatch)
                    }}> <i class="fa fa-times"></i></button>
            </div>

            }
                
        </div>
    )
}

