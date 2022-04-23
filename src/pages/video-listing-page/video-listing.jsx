import { useState, useEffect } from "react"
import { useVideoDataFromServer } from "../../context/video-context"
import VideoCard from "./components/Video-Card"
import "./video-listing.css"

export const VideosListing = () => {
    const { videoState } = useVideoDataFromServer()
    const [showPageVideo, setShowPageVideo] = useState([])
    useEffect(() => {
        setShowPageVideo(videoState.allVideos)
    }, [videoState.allVideos])
    return (
        <div className="videos-page">
            {showPageVideo.length > 0 ? showPageVideo.map((video) => {
                return (
                    <div key={video._id}>
                        <VideoCard video={video} />
                    </div>
                )
            }) : <p>Loading...</p>}
        </div>
    )
}
