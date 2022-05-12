import { useUserData } from "../../../../context/user-data-context"
import { deleteVideoInPLaylist } from "../../../../services"
import { useAuth } from "../../../../context/auth-context"
import "./playlist-video.css"
export const PlaylistVideo = ({ video, playlistIdForVideo }) => {
    const { userDataState, userDataDispatch } = useUserData()
    const { token } = useAuth()

 
    return (
        <div className="playlist-video">
            <div className="playlist-video-img">
                <img src={`https://i.ytimg.com/vi/${video._id}/maxresdefault.jpg`} alt={video.title} />
            </div>
            <div className="playlist-video-title">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
            </div>
            <div className="playlist-video-icon">
                <span className="fa fa-trash" onClick={() => {
                    deleteVideoInPLaylist(playlistIdForVideo, video._id, token,userDataState, userDataDispatch)
                }}></span>
            </div>
        </div>
    )
}