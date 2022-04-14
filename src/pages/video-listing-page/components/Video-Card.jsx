import { VideoCardImg, VideoCardMenu, VideoCardContent, VideoCardFooter } from "./index"
import "./video-card.css"
const VideoCard = ({ video }) => {
    return (
        <div className="video-card">
            <div className="video-card-img">
                <VideoCardImg id={video._id} title={video.title} />
            </div>
            <div className="-video-card-body">
                <div className="video-card-content">
                    <VideoCardContent heading={video.title} />
                    <VideoCardMenu />
                </div>
                <div>
                    <VideoCardFooter date={video.uploadDate} creator={video.creator} />
                </div>
            </div>

        </div>
    )
}

export default VideoCard