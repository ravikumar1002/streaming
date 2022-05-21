import { useState, useEffect } from "react"
import { useVideoDataFromServer } from "../../context/video-context"
import { VideoCard } from "../../components"
// import { Rings } from  'react-loader-spinner'
import "./video-listing.css"

export const VideosListing = () => {
    const { videoState } = useVideoDataFromServer()
    const [showPageVideo, setShowPageVideo] = useState([])

    useEffect(() => {
        setShowPageVideo(videoState.allVideos)
    }, [videoState.allVideos])

    return (
        <div className="grid-layout">
            {showPageVideo.length > 0 ? showPageVideo.map((video) => {
                return (
                    <div key={video._id}>
                        <VideoCard video={video} />
                    </div>
                )
            }) :
            //  <Rings color="#00BFFF" height={80} width={80} />
             <p>loading..</p>
             }
        </div>
    )
}
