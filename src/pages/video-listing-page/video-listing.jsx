import { useState, useEffect } from "react"
import { useVideoDataFromServer } from "../../context/video-context"
import { VideoCard } from "../../components"
import "./video-listing.css"

export const VideosListing = () => {
    const { videoState } = useVideoDataFromServer()
    const [showPageVideo, setShowPageVideo] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        setShowPageVideo(videoState.allVideos)
    }, [videoState.allVideos])

    return (
        <div className="grid-layout">
            {showPageVideo.length > 0 ? showPageVideo.map((video) => {
                return (
                    <div key={video._id}>
                        <VideoCard video={video} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
                    </div>
                )
            }) :
             <p>loading..</p>
             }
        </div>
    )
}
