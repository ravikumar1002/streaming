import { VideoCardImg, VideoCardMenu, VideoCardContent, VideoCardFooter } from "./index"
import { Link, useParams} from "react-router-dom"
import "./video-card.css"
export const VideoCard = ({ video }) => {
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
            <div style={{ position: "absolute", top: "75%", right: "1%", zIndex: "2" }}>
                <VideoCardMenu item={video} />
            </div>
        </div>
    )
}

