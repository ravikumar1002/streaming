import ReactPlayer from 'react-player/youtube'
import { useAuth } from '../../../../context/auth-context';
import { addVideoInHistory } from "../../../../services"
import { useUserData } from '../../../../context/user-data-context';
import { useVideoDataFromServer } from "../../../../context/video-context"


export const VideoPlayer = ({ video, currentVideoRef }) => {
    const { videoState, videoDispatch } = useVideoDataFromServer();
    const { token } = useAuth()
    const { userDataDispatch } = useUserData()
    
    const increaseViewCount = (video) => {
        const updatedVideo = videoState.allVideos.map((eachVideo) =>
            eachVideo._id === video._id
                ? { ...eachVideo, viewCount: eachVideo.viewCount + 1 }
                : eachVideo
        );
        videoDispatch({ type: "INCREASE_COUNT", payload: { videos: updatedVideo } });
    };

    return (
        <div className='player-wrapper'>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${video._id}`}
                controls
                width="100%"
                height="90%"
                className='react-player currentVideoRef'
                onStart={() => {
                    if (token) addVideoInHistory(video, token, userDataDispatch);
                    increaseViewCount(video)
                }}
                ref={currentVideoRef}
            />
        </div>
    )
}