import { useParams } from "react-router-dom";
import "./single-video-page.css"
import { useVideoDataFromServer } from "../../context/video-context"
import { VideoPlayer, VideoPlayerFooter } from './components';
import { VideoCard } from "../../components";

export const SingleVideoPage = () => {
    const { singlevideoid } = useParams()
    const { videoState } = useVideoDataFromServer()
    const currentVideo = videoState.allVideos.find(videos => videos._id === singlevideoid)
    const categoryVideo = videoState.allVideos.filter(category => currentVideo.category === category.category && currentVideo._id !==  category._id)

    return (
        <div className="single-video-wrapper">
            {
                videoState.allVideos.length > 0 ? <div>
                    <div className='single-video-player'>
                        <VideoPlayer videoId = {currentVideo._id}/>
                        <VideoPlayerFooter currentVideo ={currentVideo} />
                    </div>
                    <div>
                    </div>
                </div>
                :
                <div>
                    "loading"
                </div>
            }
            <div>
            {categoryVideo.length > 0 && categoryVideo.map(video => {
                return (
                <div>
                    <div className="py-1">
                        <h2> More {currentVideo.category}</h2>
                    </div>
                    <div>
                    <VideoCard video={video} key={video._id} />
                    </div>
                </div>
                )
            })}
            </div>
        </div>
    )
}